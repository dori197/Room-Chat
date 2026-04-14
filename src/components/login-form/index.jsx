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
            const { data, error } = await supabase.auth.signInWithPassword({
                email: value.email,
                password: value.password,
            });

            if (error) {
                toast.error("Tên đăng nhập hoặc mật khẩu không đúng !");
                return;
            }

            if (data.user) {
                localStorage.setItem("id", data.user.id);
                localStorage.setItem("username", data.user.user_metadata.full_name || "Ẩn danh");
                localStorage.setItem("avatar", data.user.user_metadata.avatar_url || null);
                navigate("/chat-page");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi hệ thống !");
        }
        console.log(value);
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/chat-page`
                }
            });
            if (error) {
                toast.error("Không thể kết nối với google !");
                return;
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi hệ thống!");
        }
    };

    return (
        <div className="w-300px bg-white rounded-2xl p-5 border border-black">
            <h3 className="text-center text-2xl font-bold mb-8 text-black">Đăng nhập</h3>
            <Form labelCol={{ span: 24 }} onFinish={handleSubmit}>
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
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu !" },
                        { min: 6, message: "Tối thiểu 6 kí tự !" },
                    ]}>
                    <Input.Password placeholder='Mật khẩu...' />
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
            <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">Hoặc</span>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <Button
                htmlType="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center mb-5"
                size="large"
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google Logo"
                    className="w-5 h-5"
                />
            </Button>
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
