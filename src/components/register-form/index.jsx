import { Form, Input, Button } from 'antd';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
            const response = await supabase
                .from("users")
                .insert({ username: value.username, password: value.password })
                .select();
            console.log(response);
            if (response.error) {
                if (response.error.code === "23505") {
                    toast.error("Tên đăng nhập đã tồn tại !");
                } else {
                    toast.error("Lỗi từ DB: " + response.error.message);
                }
                return;
            } 
            if (response.data) {
                toast.success("Đăng kí thành công !");
                navigate("/");
            }
        } catch (error) {
            toast.error("Đăng kí thất bại !");
            console.error(error);
        }
    };
    return (
        <div className="bg-white w-300px rounded-2xl p-5">
            <h3 className="text-black text-[24px] text-center font-bold mb-30px">Đăng kí</h3>
            <Form labelCol={{ span: 24 }} onFinish={handleSubmit} onFinishFailed={checkValidPassword}>
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
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        { required: true, message: "Please input your confirm password!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("The password don't match !"));
                            }
                        })
                    ]}>
                    <Input.Password />
                </Form.Item>
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
