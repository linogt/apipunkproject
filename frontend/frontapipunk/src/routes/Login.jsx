import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {

            localStorage.setItem('email',loginInfo.email);
            const response = await axios.post('http://localhost:8080/auth/login', {
                login: loginInfo.email,
                password: loginInfo.password,
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                // Login bem-sucedido, redirecione para a rota /beer
                window.location.href = '/beer';
            } else {
                setErrorMessage('Login e Senha não conferem, tente novamente');
            }
        } catch (error) {
            // Trate erros de rede ou erros de servidor aqui
            setErrorMessage('Erro de rede ou servidor. Tente novamente mais tarde.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value,
        });
    };

    return (
        <div className='container d-flex card'>
            <div className='row'>
                <div className='col-md-5 d-flex flex-column justify-content-center align-items-center'>
                    <h1 style={{ color: '#EEAD2D', fontSize: '20px' }}>Bem Vindo, faça o login para acessar sua conta!</h1>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite o seu e-mail"
                        style={{ marginBottom: '10px', border: '2px solid #EEAD2D' }}
                        name="email"
                        value={loginInfo.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Digite a sua senha"
                        style={{ marginBottom: '10px', border: '2px solid #EEAD2D' }}
                        name="password"
                        value={loginInfo.password}
                        onChange={handleInputChange}
                    />
                    {errorMessage && <p style={{ color: 'red' }}>E-mail ou Senha incorretos, tente novamente.</p>}
                    <div className='d-flex align-items-center justify-content-between'>
                        <button
                            className='btn btn-primary'
                            style={{ background: '#EEAD2D', borderColor: '#EEAD2D', marginRight: '10px' }}
                            onClick={handleLogin}
                        >
                            Entrar
                        </button>
                        <a href="/Register" style={{ textDecoration: 'none', color: '#EEAD2D' }}>Ainda não tenho cadastro</a>
                    </div>
                </div>
                <div className='col-md-5' style={{ marginLeft: '10px' }}>
                    <img src="src\assets\undraw_adventure_re_ncqp.svg" style={{ width: '90%' }} alt="Illustration" />
                </div>
            </div>
        </div>
    );
}

export default Login;
