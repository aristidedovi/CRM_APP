/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState,useEffect, useRef } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  
  CardHeader,
  CardBody,
  CardFooter,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Card from '@mui/material/Card';


//Now let's add the toast messages for our errors.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductsUpdate from "./products/ProductsUpdate";

const Index = (props) => {
  return (
    <>
       <Header />
      {/* <DashboardHeader/> */}
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadows">
              {/* <CardHeader className="bg-trasparent">

              </CardHeader> */}
              <CardBody>
                <ProductsUpdate />
              </CardBody>
            </Card>
          </Col>

        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">

          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Index;
