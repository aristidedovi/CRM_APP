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

import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import { Badge } from 'primereact/badge';
import { InputText } from 'primereact/inputtext';
import './DataTableStyle.css';
import ProductsHead from './ProductsHead';
import { Dialog } from 'primereact/dialog';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Dropdown } from 'primereact/dropdown';
import CardMedia from '@mui/material/CardMedia';
import { FilterMatchMode } from 'primereact/api';
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

//Now let's add the toast messages for our errors.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import bsCustomFileInput from 'bs-custom-file-input';
import { Dashboard } from "@mui/icons-material";
import DashboardHeader from "components/Headers/DashboardHeader";
import { apiService } from "services/apiService";


const toastSucess = (message) => {
  toast.success(message)
} 

const toastError = (error) => {
  toast.error(error)
} 

const AllProducts = (props) => {

  //const [data, setData] = useState(null);
  const [loading2, setLoading2] = React.useState(true);

  const [productHistories, setProductHistories] = React.useState([]);

  const navigate = useNavigate();

  var options = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('Auth Token')}`,
    }
  }


  // const getProductsData = () => {
  //   return fetch('http://localhost:5000/api/v1/products', options)
  //   .then(response => response.json());
  // }
  
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pages, setPages] = useState(1);
  //const [currentPage, setCurrentPage] = useState(1)

  const [uploadedData, setUploadedData] = useState(true);

  const [yuupee_produits_length, setYuupee_produits_length] = useState()
  const [last_date_import, setLast_date_import] = useState()



  // const getProductsHistories = () => {
  //   return fetch(`http://localhost:5000/api/v1/product_histories?page=${currentPage}`, options)
  //   .then(response => {
  //     if (response.status === 401) {
  //       navigate('/auth/login')
  //       sessionStorage.clear()
  //     } else {
  //       return response.json()
  //     }
  //   });
  // }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    //console.log('next')
    setCurrentPage((prevPage) => prevPage + 1);
  };
  var pagesCount = []


  useEffect(() => {
    //get all products
    
    apiService.get('products')
      .then(json => {
        //setData(json)
        setYuupee_produits(json ? json['products'] : [])
        setYuupee_produits_length(json ? json['products_size'] : [])
        setLast_date_import(json ? json['last_date_import'] : [])
        setLoading2(false);
      })
      .catch(error => {
        console.error(error)
        setLoading2(false);
      });

      //get product import histories
      apiService.get(`product_histories?page=${currentPage}`)
      .then(json => {
        setProductHistories(json ? json['product_history'] : [])
        setHasNextPage(json ? json['has_next'] :  []);
        setPages(json ? json['pages'] :  []);
        setCurrentPage(json ? json['current_page']: [])
        //console.log(json['product_history'])
      })
      .catch(error => {
        console.error(error)
      });

      //setUploadedData(false)

  }, [currentPage, last_date_import]);

  const get_pagination =  pages => {
    let content = []

    for (let i = 1; i <= pages; i++) {
      content.push(
            <PaginationItem key={i} className={currentPage === i ? 'active' : '' }>
              <PaginationLink
                onClick={(e) => {
                  setCurrentPage(i)
                }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>)
    }

    return content;
  }


  //console.log(data);

  const testProducts =
  [
    {
      id: 1,
      FA_CodeFamille: "Ordinateur",
      AR_Design: "ORD",
      Colonne1: "ORDINATEUR",
      AR_PrixVen:1000,
      Sur_Site_Web:'NON',
      YU_PRIX: 1000,
      YU_PRIX_TTC: 1000,
      YU_PRIX_B_B: 1000,
      YU_PRIX_B_B_TTC:1000,
      //YU_PRIX: parseInt(x[' AR_PrixVen'].trim().replaceAll(' ', ''))*(30/100) + parseInt(x[' AR_PrixVen'].trim().replaceAll(' ', '')),
      StockTOTAL: 1,
    },
    {
      id: 1,
      FA_CodeFamille: "Ordinateur",
      AR_Design: "ORD",
      Colonne1: "ORDINATEUR",
      AR_PrixVen: parseInt("1000"),
      Sur_Site_Web:'OUI',
      YU_PRIX: 1000,
      YU_PRIX_TTC: 1000,
      YU_PRIX_B_B:1000,
      YU_PRIX_B_B_TTC: 1000,
      //YU_PRIX: parseInt(x[' AR_PrixVen'].trim().replaceAll(' ', ''))*(30/100) + parseInt(x[' AR_PrixVen'].trim().replaceAll(' ', '')),
      StockTOTAL: 1,
    }
  ]
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

//Datatable variable
  const [yuupee_produits, setYuupee_produits] = React.useState([]);
  const [productFilter, setProductFilter] = React.useState([]);
  const [productDialog, setProductDialog] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [products, setProducts] = React.useState(null);
  const [product, setProduct] = React.useState({});
  //const [product, setProduct] = React.useState(emptyProduct);

  


  const [filters2, setFilters2] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'FA_CodeFamille': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'AR_Design': { value: null, matchMode: FilterMatchMode.CONTAINS},
    'Sur_Site_Web' : { value: null, matchMode: FilterMatchMode.EQUALS},
    'Colonne1': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'status': { value: null, matchMode: FilterMatchMode.EQUALS },
    'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
});

const [globalFilterValue2, setGlobalFilterValue2] = useState('');

let count_Out_Stock;

const dt = useRef(null);
    const toast = useRef(null);

    const cols = [
      { field: 'id', header: 'Id' },
      { field: 'AR_Design', header: 'AR_Design' },
      { field: 'Colonne1', header: 'Colonne1' },
      { field: 'YU_PRIX', header: 'YU_PRIX' },
      { field: 'YU_PRIX_TTC', header: 'YU_PRIX_TTC' },
      { field: 'YU_PRIX_B_B', header: 'YU_PRIX_B_B' },
      { field: 'StockTOTAL', header: 'StockTOTAL' }
  ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));



  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2['global'].value = value;
  
    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  }
  
  
  const exportCSV = (selectionOnly) => {
  dt.current.exportCSV({ selectionOnly });
  }
  
  const exportPdf = () => {
  import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(() => {
          const doc = new jsPDF.default(0, 0);
          doc.autoTable(exportColumns, productFilter);
          doc.save('products.pdf');
      })
  })
  }
  
  const exportExcel = () => {
  import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(productFilter);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAsExcelFile(excelBuffer, 'products');
  });
  }
  
  const saveAsExcelFile = (buffer, fileName) => {
  import('file-saver').then(module => {
      if (module && module.default) {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data = new Blob([buffer], {
              type: EXCEL_TYPE
          });
  
          module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
  });
  }

  const useStyles = makeStyles(theme => ({
    colorProductForunisseur: {
      background: '#0ba360',
      border: 0,
      borderRadius: 3,
      /*boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',*/
      color: 'white',
      height: 'max-content',
      padding: '10px',
      margin: '10px',
    },
    colorProductSiteWeb: {
      background: '#4facfe',
      border: 0,
      borderRadius: 3,
      color: 'white',
      height: 'max-content',
      padding: '10px',
      margin: '10px',
    },
    colorOutStock: {
      background: '#ff0844',
      border: 0,
      borderRadius: 3,
      color: 'white',
      margin: '0px',
      height: 'max-content',
      padding: '10px'
    },
    colorText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '2rem'
    }
  })
  )
  const classes = useStyles();
  
  
  const renderHeader2 = () => {
    return (
      <div className='row'>
          <div className="p-d-flex p-jc-end">
              <Button type="button" icon="pi pi-file" onClick={() => exportCSV(false)} className="mr-2" style={{marginRight: '10px'}} data-pr-tooltip="CSV" />
              <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success mr-2" style={{marginRight: '10px'}}  data-pr-tooltip="XLS" />
              <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" style={{marginRight: '10px'}}  data-pr-tooltip="PDF" />
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Recherche Global" />
              </span>
          </div>
    </div>
    )
  }
  
  
  
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
  const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
  
  const header2 = renderHeader2();

  
  const priceBodyTemplate = (rowData) => {
    //console.log(rowData)
    let value_ht= 'HT '+(rowData.YU_PRIX.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }));
    //let value_ttc= 'TTC '+(rowData.YU_PRIX_TTC.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }));
    //console.log(value_ht)
    return (
      <p><b>{value_ht}</b></p>
      );
  }
  
  
  const priceBtoBBodyTemplate = (rowData) => {
    //return formatCurrency(rowData.YU_PRIX_B_B);
    let value_ht= 'HT '+(rowData.YU_PRIX_B_B.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }));
    let value_ttc= 'TTC '+(rowData.YU_PRIX_B_B_TTC.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }));
    return (
          <p><b>{value_ht}</b><br/>{value_ttc}</p>
          );
  }

  
  const priceFournisseurBodyTemplate = (rowData) => {
  return (rowData.AR_PrixVen.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }));
  }
  
  const footer = `Tableau de produit`;
  
  const footer1 = () => {
  return (<span> 
    Au total, il y a 
    <Badge value={yuupee_produits.length}></Badge> 
    produits, il y a 
    <Badge value={props.siteWebProduct.length}></Badge> 
    sur le site web et il y a 
    <Badge value={count_Out_Stock}></Badge>
    produits qui ne sont pas en stock
    </span>)
  }
  
  const rowClass = (data) => {
    //console.log(data)
  return {
      'row-accessories': data.StockTOTAL === 0
  }
  }
  
  const hideDialog = () => {
  setSubmitted(false);
  setProductDialog(false);
  }
  
  
  const showProductFourniseurPrice = (product) => {
  setProduct(product);
  setProductDialog(true);
  //console.log(product)
  //console.log(product)
  }
  
  const actionBodyTemplate = (rowData) => {
  return (
      <React.Fragment>
          <Button icon="pi pi-eye" className="p-button-rounded p-button-info p-button-text mr-2" onClick={() => showProductFourniseurPrice(rowData)} />
      </React.Fragment>
  );
  }
  
  const productDialogFooter = (
  <React.Fragment>
      <Button label="Fermer" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
  </React.Fragment>
  );
  
  const statuses = [
  'OUI', 'NON'
  ];
  
  const statusItemTemplate = (option) => {
  return <span className={`customer-badge status-${option}`}>{option}</span>;
  }
  
  const statusRowFilterTemplate = (options) => {
  return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Sel.." className="p-column-filter" showClear />;
  }
  
  
  const statusBodyTemplate = (rowData) => {
  let value;
  if (rowData.Sur_Site_Web === 'OUI') {
      value = <Badge value={rowData.Sur_Site_Web} className="mr-0" severity="success"></Badge>
  } else if(rowData.Sur_Site_Web === 'NON') {
    value = <Badge value={rowData.Sur_Site_Web} className="mr-0" severity="danger"></Badge>
  }
  return value;
  //return <span className={`product-badge status-${rowData.Sur_Site_Web.toLowerCase()}`}>{rowData.Sur_Site_Web}</span>;
  }

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);

  const inputRef = useRef(null);



  //bsCustomFileInput.init()


  	const changeHandler = (event) => {
      //bsCustomFileInput.init()
      //console.log(event.target.val(''))

      setSelectedFile(event.target.files[0]);
      // console.log(event.target.value)
      // event.target.value = ""
      // console.log(event.target.value)
      setIsFilePicked(true);
      //bsCustomFileInput.destroy()
      
	  };

  const handleSubmission = () => {
    const formData = new FormData();
    setLoading2(true);

    formData.append('uploaded-file', selectedFile);
    //toastSucess()
    //bsCustomFileInput.destroy()


    

    // fetch(
    //   'http://localhost:5000/api/v1/upload_data',
    //   {
    //     method: 'POST',
    //     body: formData,
    //   }
    // )
    // .then((response) => {
    //   return response.json()
    // })
    apiService.post('upload_data', formData)
    .then((result) => {
      toastSucess(result['message'])
      //console.log('Success:', result['message']);
      inputRef.current.value = null;
      
      apiService.get('products')
      .then(json => {
        //setData(json)
        setYuupee_produits(json ? json['products'] : [])
        setYuupee_produits_length(json ? json['products_size'] : [])
        setLast_date_import(json ? json['last_date_import'] : [])
        setLoading2(false);
      })
      .catch(error => {
        console.error(error)
        setLoading2(false);
      });


      //get product import histories
      apiService.get(`product_histories?page=${currentPage}`)
      .then(json => {
        setProductHistories(json ? json['product_history'] : [])
        setHasNextPage(json ? json['has_next'] :  []);
        setPages(json ? json['pages'] :  []);
        setCurrentPage(json ? json['current_page']: [])
        //console.log(json['product_history'])
      })
      .catch(error => {
        console.error(error)
      });
      
    })
    .catch((error) => {
      toastError(error['message'])
      console.error('Error:', error['message']);
    });
    //setUploadedData(false)
  };

  const buttonDisabled = () => {
    var disable_button = false;
    if (loading2 || !isFilePicked) {
      disable_button = true;
    }
    return disable_button;
  }



  return (
    <>
       <Header last_date_import={last_date_import} totalProduct={yuupee_produits_length} />
      {/* <DashboardHeader/> */}
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {/* Products Datatable */}
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
            <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h6 className="text-uppercase ls-1 mb-1">
                  Products
                </h6>
                <h2 className="mb-0">All producs</h2>
              </div>
              <div className="col">
              <Nav className="justify-content-end" pills>
                <NavItem>
                  <div className="custom-file">
                    <input ref={inputRef}  type="file" onChange={changeHandler}  />
                  </div>
                </NavItem>
                <NavItem>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleSubmission}
                    size="sm"
                    disabled={buttonDisabled()}
                    >
                    Submit
                  </Button>
                </NavItem>
              </Nav>
              </div>
              {/* <div className="col"> */}
                    {/* <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          //onClick={(e) => toggleNavs(e, 2)}
                        >

                          {/* <span className="d-none d-md-block">Upload file</span> */}
                          {/* <span className="d-md-none">M</span> */}

                          {/*<input className="d-none d-md-block" type="file" name="file" onChange={changeHandler} />
                          <div>
                            <button onClick={handleSubmission}>Submit</button>
                          </div>
                        </NavLink>
                      </NavItem> */}
                      {/* <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem> */}
                    {/* </Nav> */}
                  {/* </div> */}
            </Row>
            </CardHeader>
            <CardBody>
                {/* Chart */}
                <div style={{ height: 'auto' }}>
        <div className="datatable-templating-demo" style={{marginTop:'10px'}}>
          <div className="card">
{/*          <ProductsHead allProducts={testProducts} siteWebProduct={props.siteWebProduct} ruptureProduct={props.ruptureProduct} />
*/}
            <DataTable ref={dt} value={yuupee_produits} onValueChange={filteredData => { setProductFilter(filteredData)}} size="small" header={header2} footer={footer} showGridlines stripedRows 
              paginator responsiveLayout="scroll" rowClassName={rowClass}
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,100]}
              paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} 
              aginator className="p-datatable-customers"
              dataKey="id" filters={filters2} filterDisplay="row" loading={loading2}
              globalFilterFields={['FA_CodeFamille', 'country.name', 'representative.name', 'status']}
              emptyMessage="No product found.">
                <Column field="id" header="Id"></Column>
                <Column field="AR_Design" header="Désignation" filter filterPlaceholder="Search by Désignation" style={{ minWidth: '12rem', fontSize: '0.7rem', fontWeight: 'bold'   }} ></Column>
                <Column field="Colonne1" header="Catégorie" filter filterPlaceholder="Search by Catégorie" style={{ minWidth: '12rem', fontSize: '0.7rem'  }}></Column>
                {/*<Column field="Sur_Site_Web" body={statusBodyTemplate} style={{ fontSize: '0.7rem', fontWeight: 'bold'  }} header="Sur le site web" howFilterMenu={false}></Column>*/}
                {/*<Column field="Sur_Site_Web" body={statusBodyTemplate} style={{ fontSize: '0.7rem', fontWeight: 'bold'  }} header="Sur le site web" howFilterMenu={false} filter filterElement={statusRowFilterTemplate} ></Column>*/}
                <Column field="YU_PRIX" header="Prix Yuupee BtoC (HT/TTC)" body={priceBodyTemplate} style={{ fontSize: '0.7rem', fontWeight: 'bold'  }} sortable></Column>
                {/*<Column field="YU_PRIX_B_B" header="Prix Yuupee BtoB (HT/TTC)" body={priceBtoBBodyTemplate} style={{ fontSize: '0.7rem', fontWeight: 'bold', backgroundColor: '#FEFEE2'  }} sortable></Column>*/}
                <Column field="StockTOTAL" header="Stock" style={{ fontSize: '0.7rem', fontWeight: 'bold'  }} sortable></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '5rem' }}></Column>
            </DataTable>

            <Dialog visible={productDialog} style={{ width: '800px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image="/images/defaultProduct.png"
                    alt="green iguana"
                  />
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                  {product.Colonne1}
                </Typography>
                <Typography variant="h6" component="div">
                  {product.AR_Design}
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom>
                  { product.StockTOTAL >= 1 && <Badge value={'Disponible'} className="mr-0" severity="success"></Badge>}
                  { (product.StockTOTAL === '-' || product.StockTOTAL >= 400) && <Badge value={'Rupture'} className="mr-0" severity="danger"></Badge>}
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom>
                  { product.StockTOTAL >= 1 && (product.StockTOTAL) + ' En stock'}
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom>
                  Prix Fournisseurs : {(product.AR_PrixVen)}
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom>
                  Prix YUUPEE : {(product.YU_PRIX)}
                </Typography>
                {/*<Box sx={{ flexGrow: 1, marginBottom:'20px', marginTop:'30px' }}>
                  <Grid container direction="row" spacing={1} justifyContent='center'>
                      <Grid item xs={4} md={4} sm={4} lg={4}  border='2px'className={classes.colorProductForunisseur}>
                        <Typography variant="subtitle1" component="div" style={{fontWeight: 'bold',fontSize: "0.9rem"}}>
                          Prix Fournisseurs
                        </Typography>
                        <Typography variant="h6" style={{fontSize: "0.9rem"}}  className={classes.colorText} >
                          {formatCurrency(product.AR_PrixVen)}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={4} sm={4} lg={4} border='2px'className={classes.colorProductSiteWeb}>
                        <Typography variant="subtitle1" component="div" style={{fontWeight: 'bold', fontSize: "0.9rem"}}>
                          Prix YUUPEE 
                        </Typography> 
                        <Typography variant="h6" style={{fontSize: "0.9rem"}}  className={classes.colorText}>
                          {formatCurrency(product.YU_PRIX)}
                        </Typography>
                      </Grid>
                  </Grid>
                </Box>*/}
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Disponible sur le site web : &nbsp;
                  {product.Sur_Site_Web === 'OUI' && <Badge value={product.Sur_Site_Web} className="mr-0" severity="success"></Badge>}
                  {product.Sur_Site_Web === 'NON' && <Badge value={product.Sur_Site_Web} className="mr-0" severity="danger"></Badge>}
                </Typography>
              </Grid>
            </Grid>
                {/*<div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Price Fournisseur</label>
                        <InputNumber id="price" value={product.AR_PrixVen} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="XOF" locale="sn-SN" />
                    </div>
                    <div className="field col">
                        <label htmlFor="price">Price Sur YUUPEE</label>
                        <InputNumber id="price" value={product.YU_PRIX} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="XOF" locale="sn-SN" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity">Stock Total</label>
                        <InputNumber id="quantity" value={product.StockTOTAL} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                    </div>
                </div>*/}
            </Dialog>

            </div>
          </div>
      </div>
              </CardBody>
            </Card>
          </Col>


          {/* <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Product Import History</h3>
                  </div>
                  <div className="col text-right">
                    {/* <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button> */}
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Date import</th>
                    <th scope="col">File name</th>
                    <th scope="col">File Size</th>
                  </tr>
                </thead>
                <tbody>
                  { productHistories ?
                    productHistories.map((item)=> (
                      <tr key={item.id}>
                        <th scope="row">{item.id}/</th>
                        <td>{item.date_import}</td>
                        <td>{item.file_name}</td>
                        <td>
                          <i className="fas fa-arrow-up text-success mr-3" /> {item.file_size} KB
                        </td>
                      </tr>
                    )): []

                  }
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className={currentPage === 1 ? 'disabled' : '' }>
                      <PaginationLink
                        onClick={handlePreviousPage}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>

                    {/* { pages ? 
                      pages.map((item) => {
                        <PaginationItem className="active">
                          <PaginationLink
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                      }) : []
                    } */}
                    {get_pagination(pages)}
                    

                    <PaginationItem className={!hasNextPage ? 'disabled' : '' }>
                      <PaginationLink
                        onClick={handleNextPage}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </Col>
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col> */}
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default AllProducts;
