import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';
import SelectableField from "./SelectableField";

const InvoiceItem =(props) =>{

    useEffect(() => {

    }, [props.items]);


    const onItemizedItemEdit = props.onItemizedItemEdit;
    const onItemizedPartsEdit = props.onItemizedPartsEdit;
    const currency = props.currency;
    const rowDel = props.onRowDel;
    const onPartRowDel = props.onPartRowDel
    const onRowAdd = props.onRowAdd;
    const onRowPartAdd = props.onRowPartAdd;
    const itemTable = props.items.map(function (item){
        return (
            <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} items={props.item}  onDelEvent={rowDel} key={item.id}
                     currency={currency}/>
        )
    });
    const partsTable = props.dataparts.map(function (item){
        return (
            <PartRow onItemizedItemEdit={onItemizedPartsEdit} item={item} parts={props.parts} onDelEvent={onPartRowDel} key={item.id}
                     currency={currency}/>
        )
    });

    return (
        <>
            <div>
                <h2>Services</h2>
                <Table>
                    <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>QTY</th>
                        <th>PRICE/RATE</th>
                        <th className="text-center">ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itemTable}
                    </tbody>
                </Table>
                <Button style={{background:'#19335A' ,outline:"none", border:"none"}} className="fw-bold" onClick={onRowAdd}>Add Item</Button>
            </div>
    <div>
        <h2>Spare Parts</h2>
        <Table>
            <thead>
            <tr>
                <th>ITEM</th>
                <th>QTY</th>
                <th>PRICE/RATE</th>
                <th className="text-center">ACTION</th>
            </tr>
            </thead>
            <tbody>
            {partsTable}
            </tbody>
        </Table>
        <Button style={{background:'#19335A' ,outline:"none", border:"none"}} className="fw-bold" onClick={onRowPartAdd}>Add Item</Button>
    </div>
        </>
        );



}

const ItemRow =(props)=> {


    const onDelEvent=()=> {
        props.onDelEvent(props.item);
    }

        return (
            <tr>
                <td style={{width: '100%'}}>
                    <SelectableField
                        onItemizedItemEdit={props.onItemizedItemEdit}
                        parts={props.items}
                        cellData={{
                            type: "text",
                            name: "name",
                            placeholder: "Item name",
                            value: props.item.name,
                            id: props.item.id,
                        }}/>
                    {/*<EditableField*/}
                    {/*    onItemizedItemEdit={props.onItemizedItemEdit}*/}
                    {/*    cellData={{*/}
                    {/*        type: "text",*/}
                    {/*        name: "description",*/}
                    {/*        placeholder: "Item description",*/}
                    {/*        value: props.item.description,*/}
                    {/*        id: props.item.id*/}
                    {/*    }}/>*/}
                </td>
                <td style={{minWidth: '70px'}}>
                    <EditableField
                        onItemizedItemEdit={props.onItemizedItemEdit}
                        cellData={{
                            type: "number",
                            name: "quantity",
                            min: 1,
                            step: "1",
                            value: props.item.quantity,
                            id: props.item.id,
                        }}/>
                </td>
                <td style={{minWidth: '130px'}}>
                    <EditableField
                        onItemizedItemEdit={props.onItemizedItemEdit}
                        cellData={{
                            leading: props.currency,
                            type: "number",
                            name: "price",
                            min: 1,
                            step: "0.01",
                            presicion: 2,
                            textAlign: "text-end",
                            value: props.item.price,
                            id: props.item.id,
                        }}/>
                </td>
                <td className="text-center" style={{minWidth: '50px'}}>
                    <BiTrash onClick={onDelEvent} style={{height: '33px', width: '33px', padding: '7.5px'}} className="text-white mt-1 btn btn-danger"/>
                </td>
            </tr>
        );



}

const PartRow =(props)=> {


    const onDelEvent=()=> {
        props.onDelEvent(props.item);
    }

    return (
        <tr>
            <td style={{width: '100%'}}>
                <SelectableField
                    onItemizedItemEdit={props.onItemizedItemEdit}
                    parts={props.parts}
                    cellData={{
                        type: "text",
                        name: "name",
                        placeholder: "Item name",
                        value: props.item.name,
                        id: props.item.id,
                    }}/>
                {/*<EditableField*/}
                {/*    onItemizedItemEdit={props.onItemizedItemEdit}*/}
                {/*    cellData={{*/}
                {/*        type: "text",*/}
                {/*        name: "description",*/}
                {/*        placeholder: "Item description",*/}
                {/*        value: props.item.description,*/}
                {/*        id: props.item.id*/}
                {/*    }}/>*/}
            </td>
            <td style={{minWidth: '70px'}}>
                <EditableField
                    onItemizedItemEdit={props.onItemizedItemEdit}
                    cellData={{
                        type: "number",
                        name: "quantity",
                        min: 1,
                        step: "1",
                        value: props.item.quantity,
                        id: props.item.id,
                    }}/>
            </td>
            <td style={{minWidth: '130px'}}>
                <EditableField
                    onItemizedItemEdit={props.onItemizedItemEdit}
                    cellData={{
                        leading: props.currency,
                        type: "number",
                        name: "price",
                        min: 1,
                        step: "0.01",
                        presicion: 2,
                        textAlign: "text-end",
                        value: props.item.price,
                        id: props.item.id,
                    }}/>
            </td>
            <td className="text-center" style={{minWidth: '50px'}}>
                <BiTrash onClick={onDelEvent} style={{height: '33px', width: '33px', padding: '7.5px'}} className="text-white mt-1 btn btn-danger"/>
            </td>
        </tr>
    );



}

export default InvoiceItem;