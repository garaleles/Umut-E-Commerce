'use client';
import {useState} from 'react';
import toast from "react-hot-toast";
import {useRouter, useSearchParams} from "next/navigation";
import {signIn} from "next-auth/react";


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

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

            const response = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (response?.error) {
                toast.error(response.error);
                setLoading(false);
            } else {
                toast.success('Giriş başarılı.');
                setLoading(false);
                router.push(callbackUrl);
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
                        <h1 className='mb-4 text-center'>GİRİŞ YAP</h1>
                        <form onSubmit={handleSubmit} className='text-center'>
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

                            <button type='submit' disabled={loading || !email || !password}
                                    className='btn btn-primary btn-raised'>
                                {loading ? 'Yükleniyor...' : 'Giriş Yap'}
                            </button>

                            <button
                                className='btn btn-danger btn-raised '
                                onClick={() => signIn('google', {callbackUrl})}>
                                Google ile Giriş Yap
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </main>
    );
}
