import React, { useEffect, useRef, useState } from 'react'
import { supabase } from "/src/config/supabase";
import { toast } from 'react-toastify';
import { Col, Input, Modal, Row } from 'antd';
import PlusButton from '../../components/plus-button';
import Button from '../../components/button';
import { MdDeleteForever } from 'react-icons/md';
import MessageBox from '../../components/message-box';
import dayjs from 'dayjs';
import CreateButton from '../../components/create-button';

function ChatPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [roomValue, setRoomValue] = useState("");
    const [room, setRoom] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatValue, setChatValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchDebounce, setSearchDebounce] = useState("");
    const [filteredRooms, setFilteredRooms] = useState([]);

    const endRef = useRef(null);
    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchRoom = async () => {
        const { data } = await supabase.from("rooms").select("*");
        setRoom(data);
        setFilteredRooms(data);
        setCurrentRoom(data[0]);
    };

    const fetchMessages = async () => {
        const { data } = await supabase
            .from("messages")
            .select("id, content, created_at, user:users(id, username)")
            .eq("room_id", currentRoom?.id)
            .order("created_at", { ascending: true });
        setMessages(data);
    }

    useEffect(() => {
        fetchRoom();
    }, []);

    useEffect(() => {
        if (!currentRoom?.id) return;
        fetchMessages();
        const channel = supabase
            .channel("realtime-message")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                    filter: `room_id=eq.${currentRoom?.id}`,
                },
                async (payload) => {
                    const { data: userData } = await supabase
                        .from("users")
                        .select("id, username")
                        .eq("id", payload.new.user_id)
                        .single();
                    setMessages((prev) => [
                        ...prev,
                        { ...payload.new, user: userData || null },
                    ])
                }
            )
            .subscribe((status) => console.log("Channel Status: ", status));
        return () => {
            supabase.removeChannel(channel);
        };
    }, [currentRoom]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setSearchDebounce(searchValue);
        }, 1000);
        console.log("Search Debounce: ", searchDebounce);
        return () => clearTimeout(debounce);
    }, [searchValue]);

    useEffect(() => {
        handleSearch();
    }, [searchDebounce]);

    const handleCreateRoom = async () => {
        try {
            const { error, data } = await supabase
                .from("rooms")
                .insert([{ name: roomValue }])
                .select();
            if (error) {
                toast.error("Tạo phòng thất bại !");
                return;
            }
            if (data) {
                toast.success("Tạo phòng thành công !");
                //setRoomValue((prev) => [...prev, data]);
                fetchRoom();
            }
            setIsOpen(false);
            setRoomValue("");
        } catch (error) {
            toast.error("Lỗi kết nối, không thể tạo phòng !")
        }
    };

    const handleSendMessage = async () => {
        try {
            if (!chatValue.trim()) return;
            const value = chatValue.trim();
            const { data } = await supabase
                .from("messages")
                .insert([{
                    room_id: currentRoom.id,
                    user_id: localStorage.getItem("id"),
                    content: value,
                }]);
            setChatValue("");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSearch = () => {
        const filterData = room.filter((room) =>
            room.name.toLowerCase().trim().includes(searchDebounce.toLowerCase().trim())
        );
        console.log("Filter Data: ", filterData);
        setFilteredRooms(filterData);
    };

    const handleDelete = async (roomId) => {
        try {
            const { error, data } = await supabase
                .from("rooms")
                .delete()
                .eq("id", roomId)
                .select();
            if (error) {
                toast.error("Xóa phòng thất bại !");
                return;
            }
            if (data) {
                toast.success("Xóa phòng thành công !");
            }
            fetchRoom();
        } catch (error) {
            toast.error("Lỗi kết nối, không thể xóa phòng !");
        }
    };

    return (
        <section className='w-full min-h-screen'>
            <Row className='w-full'>
                <Col span={5} className='bg-var(--secondary-color) h-screen px-3 py-5 flex flex-col border border-gray-500'>
                    <div className="flex justify-center items-center gap-3 mb-10">
                        <div className="flex-1">
                            <Input
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder='Tìm kiếm phòng...'
                                color='#ffff'
                            />
                        </div>
                        <PlusButton onClick={() => setIsOpen(true)} />
                        <Modal
                            open={isOpen}
                            onCancel={() => setIsOpen(false)}
                            footer={null}
                        >
                            <div className='mt-6 flex items-center gap-3'>
                                <Input
                                    value={roomValue}
                                    onChange={(e) => setRoomValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleCreateRoom();
                                        }
                                    }}
                                    placeholder='Nhập tên phòng...'
                                    className="flex-1" 
                                />
                                <CreateButton children="Tạo" onClick={handleCreateRoom} />
                            </div>
                        </Modal>
                    </div>
                    <div className='flex-1'>
                        {filteredRooms?.map((room) => (
                            <div
                                key={room.id}
                                onClick={() => setCurrentRoom(room)}
                                className={`text-black
                                        font-bold
                                        px-4 py-3 
                                        rounded-lg 
                                        cursor-pointer 
                                        ${room.id === currentRoom?.id
                                        ? "bg-[#83e8ff]"
                                        : "bg-gray-200"
                                    }
                                        hover:bg-var(--natural-color) 
                                        hover:scale-[1.02] 
                                        shadow-[0_4px_8px_rgba(255,255,255,0.05)] 
                                        hover:shadow-[0_6px_12px_rgba(255,255,255,0.15)] 
                                        hover:opacity-[0.8]
                                        transition-all 
                                        duration-300 
                                        ease-in-out 
                                        mb-3`}
                            >
                                <div className='flex justify-between items-center'>
                                    {room?.name}
                                    <MdDeleteForever
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(room.id);
                                        }}
                                        className='size-5'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col span={19} className="h-screen border border-gray-500">
                    <div className='w-full h-5/6 p-5 overflow-y-auto'>
                        {messages?.map((messages) => (
                            <MessageBox
                                key={messages.id}
                                message={messages.content}
                                name={messages?.user?.username}
                                time={dayjs(messages.created_at).format(
                                    "HH:mm DD/MM/YYYY"
                                )}
                                sentByCurrentUser={
                                    String(messages?.user?.id) === localStorage.getItem("id")
                                }
                            />
                        ))}
                        <div ref={endRef} />
                    </div>
                    <div className='h-1/6 w-full flex justify-between items-center gap-3 px-3 bg-gray-300'>
                        <div className='flex-1'>
                            <Input
                                value={chatValue}
                                onChange={(e) => setChatValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSendMessage();
                                    }
                                }}
                                placeholder='Tin nhắn...'
                                color='#ffff'
                            />
                        </div>
                        <Button children="Gửi" onClick={handleSendMessage} />
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default ChatPage
