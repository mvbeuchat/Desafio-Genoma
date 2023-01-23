import React, { useState , useEffect} from 'react';
import { useForm } from "react-hook-form"
import api from '../connection';
import axios from 'axios';
import { Table, Checkbox, Button, Modal, Space } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import form from './form'

function PlacesTable() {
    const [isPlaceFormOpen, setIsPlaceFormOpen] = useState(false);
    const { register, handleSubmit } = useForm();

    const showPlaceForm = () => {
        setIsPlaceFormOpen(true);
    };
    const placeFormOpenOk = () => {
        setIsPlaceFormOpen(false);
    };
    const placeFormOpenCancel = () => {
        setIsPlaceFormOpen(false);
    };

    const deletePlace = async (id) => {
        try{
            let res = await axios.delete(api + 'deletePlace/' + id);
            const refresh = () => window.location.reload(true)
        } catch(e)
        {
            console.log(e)
        }
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

    
    const newPlace = async (data) => {
        console.log(data)
        try{
            let res = await axios.post(api + 'newPlace/', data);
            const refresh = () => window.location.reload(true)
        } catch(e)
        {
            console.log(e)
        }
    }

    const [dataSource, setDataSource] = useState(null);

    const message = async () => {
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
        message()
    },[])

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
        },
        {
          title: 'Visited',
          dataIndex: 'visited',
          key: 'visited',
          render: (visited) => (
            visited === "Si" ? <Checkbox checked={true}> </Checkbox> : <Checkbox checked={false}> </Checkbox>
          )
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (text, record) => (
            <>
                
                <Space direction="horizontal">
                <Button type="primary" onClick={() => {showPlaceForm()}}>Edit</Button>
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

            <Button type="primary" ghost onClick={showPlaceForm}>Add place to eat</Button>
            
            <Modal title="Ingrese los datos" open={isPlaceFormOpen} onOk={placeFormOpenOk} onCancel={placeFormOpenCancel}>
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
            

            

        </div>
    );
}

export default PlacesTable;