import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import './styles.css'

function BeerList() {
    const [comments, setComments] = useState('');
    const [name, setName] = useState('');
    const [food, setFood] = useState('');
    const [malt, setMalt] = useState('');
    const [hops, setHops] = useState('');
    const [yeast, setYeast] = useState('');
    const [abvGt, setAbvGt] = useState('');
    const [ibuGt, setIbuGt] = useState('');
    const [ebcGt, setEbcGt] = useState('');
    const [abvLt, setAbvLt] = useState('');
    const [ibuLt, setIbuLt] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState(false);
    const [ebcLt, setEbcLt] = useState('');
    const [brewedBefore, setBrewedBefore] = useState('');
    const [brewedAfter, setBrewedAfter] = useState('');
    const [id, setId] = useState('');
    const [beers, setBeers] = useState([]);
    const [text,setText] = useState([]);
    const [card, setCard] = useState(false);

    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleFoodChange = (event) => {
        setFood(event.target.value);
    };
    const handleMaltChange = (event) => {
        setMalt(event.target.value);
    };
    const handleHopsChange = (event) => {
        setHops(event.target.value);
    };
    const handleAbvGtChange = (event) => {
        setAbvGt(event.target.value);
    };
    const handleIbuGtChange = (event) => {
        setIbuGt(event.target.value);
    };
    const handleEbcGtChange = (event) => {
        setEbcGt(event.target.value);
    };
    const handleAbvLtChange = (event) => {
        setAbvLt(event.target.value);
    };
    const handleIbuLtChange = (event) => {
        setIbuLt(event.target.value);
    };
    const handleEbcLtChange = (event) => {
        setEbcLt(event.target.value);
    };
    const handleYeastChange = (event) => {
        setYeast(event.target.value);
    };
    const handleIdChange = (event) => {
        setId(event.target.value);
    };
    const handleBrewedBeforeChange = (event) => {
        setBrewedBefore(event.target.value);
    };
    const handleBrewedAfterChange = (event) => {
        setBrewedAfter(event.target.value);
    };
    const handleChatIconClick = (event) => {
        localStorage.setItem('idBeer', event.id);
        localStorage.setItem('nameBeer',event.name);
        setCard(!card);
    }

    const handleCloseChatClick = () => {
        setCard(!card);
        setText([]);
    }

    useEffect(() => {
        fetchBeers();
    }, [currentPage, search]);

    const handleSearch = () => {
        setSearch(!search);
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setSearch(!search);
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setSearch(!search);
        setCurrentPage(currentPage + 1);
    };
    const handleClear = () => {
        setName('');
        setFood('');
        setMalt('');
        setHops('');
        setYeast('');
        setAbvGt('');
        setIbuGt('');
        setEbcGt('');
        setAbvLt('');
        setIbuLt('');
        setEbcLt('');
        setBrewedBefore('');
        setBrewedAfter('');
        setId('');
    };

    function formatarData(data) {
        const partesData = data.split('-');
        const ano = partesData[0];
        const mes = partesData[1];
        return `${mes}-${ano}`;
    }

    const fetchComments = async () => {
        const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`, 
            };
        axios.post('http://localhost:8080/comments/create', null,{
                params: {
                    email: localStorage.getItem('email'),
                    idBeer: localStorage.getItem('idBeer'),
                    text: comments
                },
                headers: headers,
        });

    };

    const getComments = async () => {
        const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`, 
            }
        const response = await axios.get('http://localhost:8080/comments/get', {
                params: {
                    id: localStorage.getItem('idBeer'),
                },
                headers: headers,
            });
            setText(response.data);
            
    };




    const fetchBeers = async () => {

        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`, // Adicione o token como cabeçalho de autorização
            };


            const params = {
                page: currentPage

            };


            if (id.trim() !== '') {
                params.id = id;
            }
            if (name.trim() !== '') {
                params.name = name;
            }
            if (food.trim() !== '') {
                params.food = food;
            }

            if (malt.trim() !== '') {
                params.malt = malt;
            }

            if (hops.trim() !== '') {
                params.hops = hops;
            }

            if (yeast.trim() !== '') {
                params.yeast = yeast;
            }

            if (abvGt.trim() !== '') {
                params.abvGt = abvGt;
            }

            if (abvLt.trim() !== '') {
                params.abvLt = abvLt;
            }

            if (ibuGt.trim() !== '') {
                params.ibuGt = ibuGt;
            }
            if (ibuLt.trim() !== '') {
                params.ibuLt = ibuLt;
            }
            if (ebcGt.trim() !== '') {
                params.ebcGt = ebcGt;
            }
            if (ebcLt.trim() !== '') {
                params.ebcLt = ebcLt;
            }
            if (brewedBefore.trim() !== '') {
                params.brewedBefore = formatarData(brewedBefore);
            }
            if (brewedAfter.trim() !== '') {
                params.brewedAfter = formatarData(brewedAfter);
            }



            const response = await axios.get('http://localhost:8080/api/beers/search', {
                params: params,
                headers: headers,
            });
            console.log(response.data)
            setBeers(response.data);
        } catch (error) {
            console.error('Erro ao buscar cervejas:', error);
        }
    };






    return (
        <div className="App container">

            <div className='container card m-2' style={{ border: '1px solid', paddingTop: '4px' }}>
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>Filtros</div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input style={{ border: '1px solid #696969' }}
                                type="text"
                                className="form-control"
                                placeholder="ID"
                                value={id}
                                onChange={handleIdChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Nome da Cerveja"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Acompanhamentos"
                                value={food}
                                onChange={handleFoodChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Malte"
                                value={malt}
                                onChange={handleMaltChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Lúpulo"
                                value={hops}
                                onChange={handleHopsChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Levedura"
                                value={yeast}
                                onChange={handleYeastChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Cervejas com ABV maior que..."
                                value={abvGt}
                                onChange={handleAbvGtChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Cervejas com IBU maior que..."
                                value={ibuGt}
                                onChange={handleIbuGtChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Cervejas com EBC maior que..."
                                value={ebcGt}
                                onChange={handleEbcGtChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Cervejas com ABV menor que..."
                                value={abvLt}
                                onChange={handleAbvLtChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Cervejas com IBU menor que..."
                                value={ibuLt}
                                onChange={handleIbuLtChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input
                                type="text" style={{ border: '1px solid #696969' }}
                                className="form-control"
                                placeholder="Cervejas com EBC menor que..."
                                value={ebcLt}
                                onChange={handleEbcLtChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div style={{ color: '#889090' }}>Cervejas fabricadas a partir de...</div>
                        <div class="input-group mb-3">
                            <input
                                type="date"
                                style={{ border: '1px solid #696969' }}
                                class="form-control"
                                placeholder="Data Inicial"
                                value={brewedAfter}
                                onChange={handleBrewedAfterChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div style={{ color: '#889090' }}>Cervejas fabricadas até...</div>
                        <div class="input-group mb-3">
                            <input
                                type="date"
                                style={{ border: '1px solid #696969' }}
                                class="form-control"
                                placeholder="Data Final"
                                value={brewedBefore}
                                onChange={handleBrewedBeforeChange}
                            />
                        </div>
                    </div>


                </div>


                <div className="d-flex justify-content-between">
                    <button onClick={handleClear} className="btn btn-primary" style={{ background: 'white', borderColor: '#EEAD2D', color: '#EEAD2D' }}>Limpar</button>
                    <button onClick={handleSearch} className="btn btn-success" style={{ background: '#EEAD2D', borderColor: '#EEAD2D' }}>Buscar</button>
                </div>


            </div>

            {beers.map((beer) => (
                <Container key={beer.id} className='d-flex my-custom-container m-2 justify-items-center card' style={{ background: 'white', borderRadius: '5px', padding: '5px', display: 'flex', border: '2px solid #EEAD2D' }}>
                    <div className='d-flex'>
                        <figure style={{ background: 'yellow', borderRadius: '5px', padding: '5px', margin: '10px', display: 'flex', alignItems: 'center', width: '150px', justifyContent: 'center' }}>
                            <img
                                src={beer.image_url}
                                alt=""
                                style={{ width: '40px', objectFit: 'cover', display: 'inline' }}
                            />
                        </figure>

                        <div style={{ background: 'white', borderRadius: '5px', padding: '5px', margin: '10px', display: 'inline' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fc0fc0', marginBottom: '5px' }}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cake2-fill" viewBox="0 0 16 16">
                                        <path d="m2.899.804.595-.792.598.79A.747.747 0 0 1 4 1.806v4.886c-.354-.06-.689-.127-1-.201V1.813a.747.747 0 0 1-.1-1.01ZM13 1.806v4.685a15.19 15.19 0 0 1-1 .201v-4.88a.747.747 0 0 1-.1-1.007l.595-.792.598.79A.746.746 0 0 1 13 1.806Zm-3 0a.746.746 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v5.17c.341-.013.675-.031 1-.055V1.806Zm-3 0v5.176c-.341-.012-.675-.03-1-.054V1.813a.747.747 0 0 1-.1-1.01l.595-.79.598.789A.747.747 0 0 1 7 1.806Z" />
                                        <path d="M4.5 6.988V4.226a22.6 22.6 0 0 1 1-.114V7.16c0 .131.101.24.232.25l.231.017c.332.024.672.043 1.02.055l.258.01a.25.25 0 0 0 .26-.25V4.003a29.015 29.015 0 0 1 1 0V7.24a.25.25 0 0 0 .258.25l.259-.009c.347-.012.687-.03 1.019-.055l.231-.017a.25.25 0 0 0 .232-.25V4.112c.345.031.679.07 1 .114v2.762a.25.25 0 0 0 .292.246l.291-.049c.364-.061.71-.13 1.033-.208l.192-.046a.25.25 0 0 0 .192-.243V4.621c.672.184 1.251.409 1.677.678.415.261.823.655.823 1.2V13.5c0 .546-.408.94-.823 1.201-.44.278-1.043.51-1.745.696-1.41.376-3.33.603-5.432.603-2.102 0-4.022-.227-5.432-.603-.702-.187-1.305-.418-1.745-.696C.408 14.44 0 14.046 0 13.5v-7c0-.546.408-.94.823-1.201.426-.269 1.005-.494 1.677-.678v2.067c0 .116.08.216.192.243l.192.046c.323.077.669.147 1.033.208l.292.05a.25.25 0 0 0 .291-.247ZM1 8.82v1.659a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.938.938 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426V8.833l-.68.907a.938.938 0 0 1-1.17.276 1.938 1.938 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82Z" />
                                    </svg> <span style={{ marginLeft: '3px' }}>Fabricação: {beer.first_brewed}</span>

                                </div>
                                <div>
                                    <a href="#" onClick={() => handleChatIconClick(beer)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                    </a>
                                </div>


                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', color: '#8E236B' }}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-egg-fried" viewBox="0 0 16 16">
                                    <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" />
                                </svg> Acompanhamentos:{beer.food_pairing.map((food, index) => (
                                    <span key={index} style={{ border: '2px solid #8E236B', borderRadius: '5px', marginLeft: '10px', paddingRight: '5px', paddingLeft: '5px' }}>{food}</span>
                                ))}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', color: '#215E21', marginTop: '5px' }}>
                                <span><svg style={{ marginBottom: '5px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                                </svg> Levedura: {beer.ingredients.yeast}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', color: '#238E23', marginTop: '5px', }}>
                                <span><svg style={{ marginBottom: '5px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                                </svg> Malte:{beer.ingredients.malt.map((malt, index) => (
                                    <span key={index} style={{ border: '2px solid #238E23', borderRadius: '5px', marginLeft: '10px', paddingRight: '5px', paddingLeft: '5px' }}>{malt.name} {malt.amount.value}kg</span>
                                ))}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', color: '#6B8E23', marginTop: '5px' }}>
                                <span><svg style={{ marginBottom: '5px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                                </svg> Lúpulo:{beer.ingredients.hops.map((hops, index) => (
                                    <span key={index} style={{ border: '2px solid #6B8E23', borderRadius: '5px', marginLeft: '10px', paddingRight: '5px', paddingLeft: '5px' }}>{hops.name} {hops.amount.value}g</span>
                                ))}</span>
                            </div>
                        </div>


                    </div>

                    <div>
                        <h1 style={{ margin: '5px', fontSize: '30px', display: 'inline' }}>{beer.name}</h1>
                        <h3 style={{ marginLeft: '5px', fontSize: '20px' }}>{beer.tagline}</h3>
                        <h4 style={{ margin: '5px', fontSize: '14px', fontStyle: 'italic' }}>{beer.description}</h4>
                        <div>
                            <span style={{ margin: '5px', fontSize: '14px', border: '2px solid gray', borderRadius: '5px', color: 'gray', paddingRight: '5px', paddingLeft: '5px' }}>ID {beer.id}</span>
                            <span style={{ margin: '5px', fontSize: '14px', border: '2px solid gray', borderRadius: '5px', color: 'gray', paddingRight: '5px', paddingLeft: '5px' }}>ABV {beer.abv}</span>
                            <span style={{ margin: '5px', fontSize: '14px', border: '2px solid gray', borderRadius: '5px', color: 'gray', paddingRight: '5px', paddingLeft: '5px' }}>IBU {beer.ibu}</span>
                            <span style={{ margin: '5px', fontSize: '14px', border: '2px solid gray', borderRadius: '5px', color: 'gray', paddingRight: '5px', paddingLeft: '5px' }}>EBC {beer.ebc}</span>

                        </div>

                    </div>
                </Container>


            ))}
            <div className='d-flex justify-content-evenly' style={{ margin: '10px', color: '#EEAD2D' }}>
                {currentPage !== 1 && (
                    <div className="arrow-icon" onClick={handlePrevPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                    </div>
                )}
                {beers.length >= 10 && (
                    <div className="arrow-icon" onClick={handleNextPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                        </svg>
                    </div>
                )}
            </div>

            {card && <div className='card' style={{
                position: 'fixed', top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)', width:'80%',  border: '1px solid #EEAD2D'
            }}>
                <input
                                type="text"
                                className="form-control"
                                placeholder="Escreva um comentário sobre essa cerveja"
                                value={comments}
                                onChange={handleCommentsChange} style={{border: '1px solid black'}}
                                
                />
                 {text.map((textItem) => (<div>
                    <h1 style={{fontSize:'15px', border: '1px solid #EEAD2D', margin:'5px'}}>{textItem.email}: {textItem.text}</h1>
                </div>))}
                <button onClick={fetchComments} className="btn btn-success" style={{marginTop:'5px'}}>Enviar</button>
                <button onClick={getComments} className="btn btn-primary" style={{marginTop:'5px'}}> Ver comentários</button>
               
                <button onClick={handleCloseChatClick} className="btn btn-danger" style={{marginTop:'5px'}}>Fechar</button>
                

            </div>}



        </div>
    );
}

export default BeerList;
