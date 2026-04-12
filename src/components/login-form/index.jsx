import React from 'react'
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "/src/config/supabase";

function LoginForm() {

    const navigate = useNavigate();

    const handleSubmit = async (value) => {
        try {
            const { data, error } = await supabase
                .from("users")
                .select()
                .eq("username", value.username)
                .eq("password", value.password)
                .single();

            if (error) {
                if (error.code === "PGRST116") toast.error("Tên đăng nhập hoặc mật khẩu không đúng !");
            }

            if (data) {
                console.log(data);
                toast.success("Đăng nhập thành công !");
                localStorage.setItem("id", data.id);
                localStorage.setItem("username", data.username);
                navigate("/chat-page")
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại");
        }
        console.log(value);
    };


    return (
        <div className="w-300px bg-white rounded-2xl p-5">
            <h3 className="text-center text-2xl font-bold mb-8 text-black">Đăng nhập</h3>
            <Form labelCol={{ span: 24 }} onFinish={handleSubmit}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: "Please input your username!" },
                        { min: 6, message: "It must be at least 6 characters long" },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Please input your password!" },
                        { min: 6, message: "It must be at least 6 characters long" },
                    ]}>
                    <Input.Password />
                </Form.Item>
                <FormItem>
                    <Button
                        htmlType="submit"
                        color="default"
                        variant="solid"
                        className="w-full">
                        Đăng nhập
                    </Button>
                </FormItem>
            </Form>
            <p className="text-black text-center">
                Bạn chưa có tài khoản ?{" "}
                <Link to={"/register"} className="font-600 text-black">
                    Đăng ký
                </Link>
            </p>
        </div>
    )
}

export default LoginForm
