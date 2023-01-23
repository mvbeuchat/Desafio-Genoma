import React, { useState , useEffect} from 'react';
import { useForm } from "react-hook-form"
import api from '../connection';
import axios from 'axios';
import { Table, Checkbox, Button, Modal, Space } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import form from './form'

function PlacesTable() {
    const [isNewPlaceFormOpen, setIsNewPlaceFormOpen] = useState(false);
    const [isUpdatePlaceFormOpen, setIsUpdatePlaceFormOpen] = useState(false);
    const [updatingId, setUpdatingId] = useState()
    const { register, handleSubmit } = useForm();
    const [dataSource, setDataSource] = useState(null);

    const showNewPlaceForm = () => {
        setIsNewPlaceFormOpen(true);
    };
    const newPlaceFormOpenOk = () => {
        setIsNewPlaceFormOpen(false);
    };
    const newPlaceFormOpenCancel = () => {
        setIsNewPlaceFormOpen(false);
    };
    const showUpdatePlaceForm = (id) => {
        setUpdatingId(id)
        setIsUpdatePlaceFormOpen(true);
    };
    const updatePlaceFormOpenOk = () => {
        setIsUpdatePlaceFormOpen(false);
    };
    const updatePlaceFormOpenCancel = () => {
        setIsUpdatePlaceFormOpen(false);
    };

    
    
    const { confirm } = Modal
    const showDeleteConfirmation = (id) => {
        confirm({
          title: 'Are you sure delete this task?',
          icon: <ExclamationCircleFilled />,
          content: 'It will be deleted from the database',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK, deleting');
            deletePlace(id)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    };

    const deletePlace = async (id) => {
        try{
            let res = await axios.delete(api + 'deletePlace/' + id);
            window.location.reload(true)
        } catch(e)
        {
            console.log(e)
        }
    };

    
    const newPlace = async (data) => {
        console.log(data)
        try{
            let res = await axios.post(api + 'newPlace/', data);
            window.location.reload(true)
        } catch(e)
        {
            console.log(e)
        }
    }

    const updatePlace = async (data) => {
        data["id"] = updatingId
        console.log(data)
        try{
            let res = await axios.put(api + 'updatePlace/' + updatingId, data);
            window.location.reload(true)
        } catch(e)
        {
            console.log(e)
        }
    }

    const loadPlaces = async () => {
        try{
            let res = await axios.get(api);
            let result = res.data;
            setDataSource(result)
        } catch(e)
        {
            console.log(e)
        }
    }

    useEffect(() => {
        loadPlaces()
    },[])

    const load5StarPlaces = async () => {
        try{
            let res = await axios.get(api + '5StarPlaces/');
            let result = res.data;
            setDataSource(result);
            console.log(result);
        } catch(e)
        {
            console.log(e)
        }
    }

    const loadAllPlaces = async () => {
        try{
            let res = await axios.get(api);
            let result = res.data;
            setDataSource(result)
            console.log(result);
        } catch(e)
        {
            console.log(e)
        }
    }


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Food type',
          dataIndex: 'foodType',
          key: 'foodType',
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          key: 'rating',
          sorter: (a, b) => a.rating - b.rating,
        },
        {
          title: 'Visited',
          dataIndex: 'visited',
          key: 'visited',
          sorter: (a, b) => a.visited - b.visited,
          filters: [
            {
                text: 'true',
                value: true
            },
            {
                text: 'false',
                value: false
            }
          ],
          render: (visited) => (
            visited ? <Checkbox checked={true}> </Checkbox> : <Checkbox checked={false}> </Checkbox>
          )
          
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (text, record) => (
            <>
                
                <Space direction="horizontal">
                <Button type="primary" onClick={() => {showUpdatePlaceForm(record.id)}}>Edit</Button>
                <Button type="primary" danger onClick={() => showDeleteConfirmation(record.id)}>Delete</Button>
                </Space>
                
                
            </>
          )
        },
    ];

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />

            <Button type="primary" ghost onClick={showNewPlaceForm}>Add place to eat</Button>
            <Button type="primary" ghost onClick={loadAllPlaces}>Show all</Button>
            <Button type="primary" ghost onClick={load5StarPlaces}>Show only 5 star</Button>
            
            <Modal title="Ingrese los datos para el nuevo lugar" open={isNewPlaceFormOpen} onOk={newPlaceFormOpenOk} onCancel={newPlaceFormOpenCancel}>
            <form onSubmit={handleSubmit(newPlace)}>
                <label>
                    Name: 
                    <input type="text" {...register('name')} />
                </label>
                <br/>
                <label>
                    Address: 
                    <input type="text" {...register('address')}/>
                </label>
                <br/>
                <label>
                    Food Type: 
                    <input type="text" {...register('foodType')}/>
                </label>
                <br/>
                <label>
                    Rating: 
                    <select {...register('rating')}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <br/>
                <label>
                    Visited: 
                    <input type="checkbox" {...register('visited')}/>
                </label>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
            
            </Modal>
            


            <Modal title="Ingrese los datos nuevamente" open={isUpdatePlaceFormOpen} onOk={updatePlaceFormOpenOk} onCancel={updatePlaceFormOpenCancel}>
            <form onSubmit={handleSubmit(updatePlace)}>
                <label>
                    Name: 
                    <input type="text" {...register('name')} />
                </label>
                <br/>
                <label>
                    Address: 
                    <input type="text" {...register('address')}/>
                </label>
                <br/>
                <label>
                    Food Type: 
                    <input type="text" {...register('foodType')}/>
                </label>
                <br/>
                <label>
                    Rating: 
                    <select {...register('rating')}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <br/>
                <label>
                    Visited: 
                    <input type="checkbox" {...register('visited')}/>
                </label>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
            
            </Modal>

            

        </div>
    );
}

export default PlacesTable;