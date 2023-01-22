import React, { useState, useContext } from 'react';
import { Table } from 'antd';

function PlacesTable() {

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
        },
    ];

    const dataSource = [
        {
          key: '1',
          name: 'Honesto Mike',
          address: 'Calle del restaurante 1234',
          foodType: 'burgers',
          rating: '5',
          visited: 'Si'
        },
        {
          key: '2',
          name: 'Subway',
          address: 'Av. La Plaza 4321',
          foodType: 'Sandwiches',
          rating: '4.5',
          visited: 'No'
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