import { Form, Input, Button } from 'antd';
import React from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { supabase } from "/src/config/supabase";

function RegisterForm() {
    const navigate = useNavigate();
    const checkValidPassword = (error) => {
        console.log(error);
    };
    const handleSubmit = async (value) => {
        console.log(value);
        try {
            const response = await supabase.auth.signUp({
                email: value.email,
                password: value.password,
                options: {
                    data: {
                        full_name: value.username,
                    }
                }
            })

            console.log(response);
            if (response.error) {
                if (response.error.code === "23505") {
                    toast.error("Tên đăng nhập đã tồn tại !");
                } else {
                    toast.error("Đăng kí thất bại !");
                }
                return;
            } 
            if (response.data) {
                toast.success("Đăng kí thành công !");
                navigate("/");
            }
        } catch (error) {
            toast.error("Đăng kí thất bại !");
        }
    };
    return (
        <div className="bg-white w-300px rounded-2xl p-5 border border-black">
            <h3 className="text-black text-[24px] text-center font-bold mb-30px">Đăng kí</h3>
            <Form labelCol={{ span: 24 }} onFinish={handleSubmit} onFinishFailed={checkValidPassword}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập Email !" },
                        { type: 'email', message: "Email không hợp lệ !" },
                    ]}>
                    <Input placeholder='example@gmail.com' />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên !" },
                        { min: 3, message: "Tối thiểu 3 kí tự !" },
                    ]}>
                    <Input placeholder='Tên của bạn...' />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu !" },
                        { min: 6, message: "Tối thiểu 6 kí tự !" },
                    ]}>
                    <Input.Password placeholder='Mật khẩu...' />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        { required: true, message: "Vui lòng xác nhận lại mật khẩu !" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Mật khẩu không khớp !"));
                            }
                        })
                    ]}>
                    <Input.Password placeholder='Xác nhận mật khẩu...' />
                </Form.Item>
                <div className="text-[13px] text-red-400 italic mb-4 text-center px-2">
                    * Lưu ý: Vui lòng kiểm tra hộp thư Email để xác nhận tài khoản.
                </div>
                <Form.Item>
                    <Button
                        htmlType="submit"
                        color="default"
                        variant="solid"
                        className="w-full">
                        Đăng kí
                    </Button>
                </Form.Item>
            </Form>
            <p className="text-black text-center">
                Bạn đã có tài khoản ?{" "}
                <Link to={"/"} className=" font-600 text-black">
                    Đăng nhập
                </Link>
            </p>
        </div>
    )
}

export default RegisterForm
