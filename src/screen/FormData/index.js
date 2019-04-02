import React from 'react';
import { Form, Row, Col, Button } from 'antd';

import ContactDelivery from './ContactDelivery';
import ContactComercial from "./ContactComercial";
import ContactAdministrative from "./ContactAdministrative";

import { formItemLayout } from '../../utils/StylesConstants';

import { Redirect } from "react-router-dom";
import _ from "lodash";


class FormData extends React.Component {
    state = {
        current: 'new',
        autoCompleteResult: [],
        data: [],
        redirect: false
    };

    cancelForm = () => {
        this.setState({ redirect: true });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

            }
            this.updateStorage(values);
        });
    };

    updateStorage = (values) => {
        const uuidv1 = require('uuid/v1');
        const id =uuidv1();

        let add = {...values,id};
        let existing = JSON.parse(localStorage.getItem('data')) || [];

        existing.push(add);

        localStorage.setItem('data', JSON.stringify(existing));

        this.setState({ redirect: true });
    };

    componentDidMount() {
        this.setState({ data: JSON.parse(localStorage.getItem('data')) })
    }

    render() {
        const data=_.find(this.state.data, { 'id':this.props.match.params.id });
        const {getFieldDecorator} = this.props.form;
        return (
            <>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={12}>
                            <div className="offset-3">
                                <h5 className="border-bottom">Datos del Delivery</h5>
                            </div>
                            <ContactDelivery data={ data } getFieldDecorator={ getFieldDecorator }/>
                        </Col>
                        <Col span={12}>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={3}>
                            <h5 className="border-bottom">Contacto Administrativo</h5>
                            <Row>
                                <Col span={24}>
                                    <ContactAdministrative data={ data } getFieldDecorator={ getFieldDecorator }/>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8} offset={3}>
                            <h5 className="border-bottom">Contacto Comercial</h5>
                            <Row>
                                <Col span={24}>
                                    <ContactComercial data={ data } getFieldDecorator={ getFieldDecorator }/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={22} className="d-flex justify-content-end">
                            <Button className="mr-2" type="primary" htmlType="submit">Guardar</Button>
                            <Button type="warning" htmlType="button" onClick={ this.cancelForm }>Cancelar</Button>
                        </Col>
                    </Row>
                </Form>
                {this.state.redirect && (<Redirect to={"/"}/>)}
            </>
        )
    }
}

const FormDataRegister = Form.create({name: 'register'})(FormData);

export default FormDataRegister;