import React, { useState } from 'react';
import './styles.css';
import Axios from 'axios';


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        login: '',
        password: '',
        confirmPassword: '',
    });
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('As senhas não coincidem.');
            return;
        }


        try {
            const response = await Axios.post('http://localhost:8080/auth/register', {
                name: formData.name,
                login: formData.login,
                password: formData.password,
            });

            if (response.status === 200) {
                alert('Conta criada com sucesso!');
                // Handle success (e.g., redirect to login)
            } else {
                console.error('Registration failed:', response);
                // Handle other response statuses here
            }
        } catch (error) {
            console.error('Registration failed:', error);

            if (error.response && error.response.status === 400) {
                setError('Este email já está cadastrado.');
            } else {
                setError('Ocorreu um erro durante o registro.');
            }
        }
    };

    return (
        <div className='container d-flex card'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            </div>

            <div className='row align-items-center justify-content-between'>
                <div className='col-md-5'>
                    <h1 style={{ color: '#EEAD2D', fontSize: '25px' }}>Crie sua conta</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Digite seu nome"
                            style={{ marginBottom: '10px', border: '2px solid #EEAD2D' }}
                        />
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <input
                            type="text"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Digite seu e-mail"
                            style={{ marginBottom: '10px', border: '2px solid #EEAD2D' }}
                        />
                        {passwordError && (
                            <div className="alert alert-danger" role="alert">
                                {passwordError}
                            </div>
                        )}
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Digite sua senha"
                            style={{ marginBottom: '10px', border: '2px solid #EEAD2D' }}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Confirme sua senha"
                            style={{ marginBottom: '10px', border: '2px solid #EEAD2D' }}
                        />
                        <div className='d-flex align-items-center justify-content-between'>
                            <button
                                type="submit"
                                className='btn btn-primary'
                                style={{ background: '#EEAD2D', borderColor: '#EEAD2D' }}
                            >
                                Cadastrar
                            </button>
                            <a href="/" style={{ textDecoration: 'none', color: '#EEAD2D' }}>Ir para tela de Login</a>
                        </div>
                    </form>
                </div>
                <div className='col-md-5'>
                    <img src="src/assets/undraw_fingerprint_re_uf3f.svg" alt="" style={{ width: '70%' }} />
                </div>
            </div>
        </div>
    );
};

export default Register;

