'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function TopNav() {
  const { data: session, status } = useSession();
  return (
    <nav className='nav shadow p-2 justify-content-between mb-3'>
      <Link href='/' className='nav-link'>
        🛒Umut E-Ticaret
      </Link>

      {status === 'authenticated' ? (
        <div className='d-flex'>
          <Link
            className='nav-link'
            href={`/dashboard/${
              session?.user?.role === 'admin' ? 'admin' : 'user'
            }`}
          >
            {session.user.name} ({session.user.role})
          </Link>
          <a
            className='nav-link btn btn-raised btn-danger'
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            Çıkış Yap
          </a>
        </div>
      ) : status === 'loading' ? (
        <a className='nav-link text-danger'>Yükleniyor...</a>
      ) : (
        <div className='d-flex'>
          <Link className='nav-link' href='/login'>
            Giriş Yap
          </Link>
          <Link className='nav-link' href='/register'>
            Kayıt Ol
          </Link>
        </div>
      )}
    </nav>
  );
}
