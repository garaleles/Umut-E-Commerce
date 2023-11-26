'use client';
import {useState} from 'react';
import toast from "react-hot-toast";
import {API} from "@/config";
import {useRouter} from "next/navigation";
import {NextResponse as response} from "next/server";


export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true);
            const response = await fetch(`${process.env.API}/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, password}),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);
                setLoading(false);
                router.push('/login');
            } else {
                const data = await response.json();
                toast.error(data.err);
                setLoading(false);
            }
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    return (
        <main>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-lg-5 shadow bg-light p-5">
                        <h1 className='mb-4 text-center'>KAYIT OL</h1>
                        <form onSubmit={handleSubmit} className='text-center'>
                            <div>
                                <input
                                    id='name'
                                    type='text'
                                    value={name}
                                    onChange={handleNameChange}
                                    className='form-control mb-4'
                                    placeholder='Adınız'
                                />
                            </div>

                            <div>

                                <input
                                    id='email'
                                    type='email'
                                    value={email}
                                    onChange={handleEmailChange}
                                    className='form-control mb-4'
                                    placeholder='E-posta Adresiniz'

                                />
                            </div>

                            <div>
                                <input
                                    id='password'
                                    type='password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className='form-control mb-4'
                                    placeholder='Şifreniz'
                                />
                            </div>

                            <button type='submit' disabled={loading || !name || !email || !password}
                                    className='btn btn-primary btn-raised'>
                                {loading ? 'Yükleniyor...' : 'Kayıt Ol'}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </main>
    );
}
