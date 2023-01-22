import React, { useState , useEffect} from 'react';
import { Table, Checkbox } from 'antd';
import api from 'axios';
import axios from 'axios';

function PlacesTable() {

    const onChangeCheckbox = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };

    const [dataSource, setDataSource] = useState(null);

    const message = async () => {
        try{
            let res = await axios.get('http://127.0.0.1:8000/');
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

    console.log(dataSource)

    const columns = [
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
        //   render: () => {<Checkbox onChange={onChangeCheckbox}>Checkbox</Checkbox>}
        },
    ];



    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
            />
            
            

        </div>
    );
}

export default PlacesTable;