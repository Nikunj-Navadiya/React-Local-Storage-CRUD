import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import React, { useState } from 'react';
import './Crud.css'

const Crud = () => {
    let data = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    const [record, setRecord] = useState(data);
    const [name, setName] = useState('');
    const [editid, setEditid] = useState(false);
    const [edit, setEdit] = useState(null);
    const [selected, setselected] = useState([]);


    // Submit Button
    const submit = (e) => {
        e.preventDefault();
        if (editid) {
            const update = record.map((v) => v.id == edit ? { ...v, name } : v);
            localStorage.setItem('users', JSON.stringify(update));
            setRecord(update);
            setEditid(false);
            setEdit(null);

        } else {
            let obj = {
                id: Math.floor(Math.random() * 1000),
                name,
                status: true
            };

            let newfile = [...record, obj];
            localStorage.setItem('users', JSON.stringify(newfile));
            setRecord(newfile);
        }
        setName('');
    };


    // Delete Button
    const Delete = (id) => {
        const Alldelete = record.filter((v) => v.id != id);
        setRecord(Alldelete);
        localStorage.setItem("users", JSON.stringify(Alldelete));
    }


    // Edit Button
    const Edit = (id) => {
        const allUpdate = record.find((v) => v.id == id);
        setName(allUpdate.name);
        setEditid(true);
        setEdit(id);
    }


    // Active & Deactive Button
    const Toggle = (id) => {
        const active = record.map((v) => v.id === id ? { ...v, status: !v.status } : v);
        setRecord(active);
        localStorage.getItem('users', JSON.stringify(active));
    }


    // Multiple Delete Button
    const DeleteSelected = () => {
        const Alldelete = record.filter((v) => !selected.includes(v.id));
        setRecord(Alldelete);
        localStorage.setItem("users", JSON.stringify(Alldelete));
        setselected([]);
    };

    const handleSelect = (id) => {
        if (selected.includes(id)) {
            setselected(selected.filter(recordId => recordId !== id));
        } else {
            setselected([...selected, id]);
        }
    };




    return (
        <div>

            <div className="container">
                <div className="row">
                    <div className="card-1 p-3">
                        <form onSubmit={submit}>
                            <h2 className="text-center">{editid ? "Todo Input Update" : "Todo Input Add"}</h2>
                            <div className='text'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='New Todo Add'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div><br></br>
                            <button type="submit" className="btn btn-info" >
                                {editid ? "Add Update Task" : "Add New Task"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>



            <div className="container">
                <div className="row">
                    <div className="card-2 ">
                        <h2 className="text-center">Todo List</h2>
                        {record.map((v, index) => {
                            const { id, name, status } = v;
                            return (
                                <div className="main-box d-flex align-items-center justify-content-center" key={index}>
                                    <div className="col-8">
                                        <div className="text-box">
                                            {name}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="button-box">
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(id)}
                                                onChange={() => handleSelect(id)}
                                            />
                                            <button className={`toggle btn ${status ? 'btn-warning' : 'btn-success'}`} onClick={() => Toggle(id)}>
                                                {status ? "Deactivate" : "Activate"}
                                            </button>
                                            <button className='btn btn-info' onClick={() => Edit(id)}><i className="fa-regular fa-pen-to-square" /></button>
                                            <button className='btn btn-danger' onClick={() => Delete(id)}><i className="fa-solid fa-trash-can" /></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div>
                            <button className='btn btn-danger' onClick={DeleteSelected} disabled={selected.length === 0}> Delete Selected</button>
                        </div>

                    </div>
                </div>
            </div>

        </div >
    );
};

export default Crud;
