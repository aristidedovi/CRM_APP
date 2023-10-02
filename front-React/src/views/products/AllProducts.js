
import React, { useState, useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { CustomerService } from '../service/CustomerService';
import { apiService } from "services/apiService";
import { Dialog } from 'primereact/dialog';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Dropdown } from 'primereact/dropdown';
import { Badge, Container } from '@mui/material';
import Header from 'components/Headers/Header';
import {Button} from 'primereact/button';


import {
  
    CardHeader,
    CardBody,
    CardFooter,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Row,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
  } from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DataTableStyle.css';




const AllProducts = () => {

    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [customers, setCustomers] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [selectedRepresentative, setSelectedRepresentative] = useState(null);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {
            'AR_Design': { value: '', matchMode: 'contains' },
            'Colonne1': { value: '', matchMode: 'contains' },
            'company': { value: '', matchMode: 'contains' },
            'representative.name': { value: '', matchMode: 'contains' },
        }
    });

    //const customerService = new CustomerService();

    const [currentPage, setCurrentPage] = useState();
    const [hasNextPage, setHasNextPage] = useState(false);
    const [pages, setPages] = useState(1);
    //const [currentPage, setCurrentPage] = useState(1)
  
    const [uploadedData, setUploadedData] = useState(true);
  
    const [yuupee_produits_length, setYuupee_produits_length] = useState()
    const [last_date_import, setLast_date_import] = useState()
    const [yuupee_produits, setYuupee_produits] = React.useState([]);
    const [loading2, setLoading2] = React.useState(true);
    const [productHistories, setProductHistories] = React.useState([]);
    const [productDialog, setProductDialog] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    const [product, setProduct] = React.useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const inputRef = useRef(null);
    const [isFilePicked, setIsFilePicked] = useState(false);








    let loadLazyTimeout = null;

    useEffect(() => {
        loadLazyData();
    },[lazyParams]) // eslint-disable-line react-hooks/exhaustive-deps

    const loadLazyData = () => {
        setLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
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
            apiService.get_products_history(`product_histories?page=${currentPage}`)
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
        }, Math.random() * 1000 + 250);
    }

    const onPage = (event) => {
        setLazyParams(event);
    }

    const onSort = (event) => {
        setLazyParams(event);
    }

    const onFilter = (event) => {
        event['first'] = 0;
        setLazyParams(event);
    }

    const onSelectionChange = (event) => {
        const value = event.value;
        setSelectedCustomers(value);
        setSelectAll(value.length === totalRecords);
    }

    const toastSucess = (message) => {
        toast.success(message)
      } 
      
      const toastError = (error) => {
        toast.error(error)
      } 

    const onSelectAllChange = (event) => {
        const selectAll = event.checked;

        if (selectAll) {
            // customerService.getCustomers().then(data => {
            //     setSelectAll(true);
            //     setSelectedCustomers(data.customers);
            // });
        }
        else {
            setSelectAll(false);
            setSelectedCustomers([]);
        }
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt={rowData.representative.name} src={`images/avatar/${rowData.representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.representative.name}</span>
            </React.Fragment>
        );
    }

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Fermer" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        </React.Fragment>
    );
        
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

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
            
    const showProductFourniseurPrice = (product) => {
        setProduct(product);
        setProductDialog(true);
        //console.log(product)
        //console.log(product)
        }

    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src="/images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    const rowClass = (data) => {
        //console.log(data)
      return {
          'row-accessories': data.StockTOTAL === 0
      }
      }

    const handleNextPage = () => {
        //console.log('next')
        console.log(currentPage)
        setCurrentPage((prevPage) => prevPage + 1);
        console.log(currentPage)
      };
    
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info p-button-text mr-2" onClick={() => showProductFourniseurPrice(rowData)} />
            </React.Fragment>
        );
    }

    const priceBodyTemplate = (rowData) => {
    //console.log(rowData)
    let value_ht= 'HT '+(rowData.YU_PRIX.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }));
    let value_btob= ''+(rowData.YU_PRIX2.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }));
    //console.log(value_ht)
    return (
      <>
        <p style={{ minWidth: '12rem', fontSize: '0.8rem', fontWeight: 'bold'   }}><b>{value_ht}</b>({value_btob})</p>
      </>
      );
  }


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
          apiService.get_products_history(`product_histories?page=${currentPage}`)
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
        <div>
            <div className="card">
            <Header last_date_import={last_date_import} totalProduct={yuupee_produits_length} />
            <Container className="mt--7" fluid>
                <Row>
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
                                </Row>
                            </CardHeader>
                        <CardBody>
                            <div style={{ height: 'auto' }}>
                            <div className="datatable-templating-demo" style={{marginTop:'10px'}}>
                            <DataTable value={yuupee_produits}  size="small" showGridlines stripedRows 
                            paginator responsiveLayout="scroll"  rowClassName={rowClass}
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,100]}
                            dataKey="id" filters={lazyParams.filters} filterDisplay="row" loading={loading2}
                            globalFilterFields={['FA_CodeFamille', 'country.name', 'representative.name', 'status']}
                            emptyMessage="No product found.">
                                <Column field="id" header="Id"></Column>
                                <Column field="AR_Design" header="Désignation" filter filterPlaceholder="Search by Désignation" style={{ minWidth: '12rem', fontSize: '0.7rem', fontWeight: 'bold'   }} ></Column>
                                <Column field="Colonne1" header="Catégorie" filter filterPlaceholder="Search by Catégorie" style={{ minWidth: '12rem', fontSize: '0.7rem'  }}></Column>
                                {/*<Column field="Sur_Site_Web" body={statusBodyTemplate} style={{ fontSize: '0.7rem', fontWeight: 'bold'  }} header="Sur le site web" howFilterMenu={false}></Column>*/}
                                {/*<Column field="Sur_Site_Web" body={statusBodyTemplate} style={{ fontSize: '0.7rem', fontWeight: 'bold'  }} header="Sur le site web" howFilterMenu={false} filter filterElement={statusRowFilterTemplate} ></Column>*/}
                                <Column field="YU_PRIX" header="Prix Yuupee BtoC (HT/TTC)" body={priceBodyTemplate} style={{ fontSize: '0.7rem', fontWeight: 'bold'  }} sortable></Column>
                                {/*<Column field="YU_PRIX2" header="Prix Yuupee BtoB (HT/TTC)" body={priceBtoBBodyTemplate} style={{ fontSize: '0.7rem', fontWeight: 'bold', backgroundColor: '#FEFEE2'  }} sortable></Column>*/}
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
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Disponible sur le site web : &nbsp;
                                {product.Sur_Site_Web === 'OUI' && <Badge value={product.Sur_Site_Web} className="mr-0" severity="success"></Badge>}
                                {product.Sur_Site_Web === 'NON' && <Badge value={product.Sur_Site_Web} className="mr-0" severity="danger"></Badge>}
                                </Typography>
                            </Grid>
                            </Grid>
                            </Dialog>
                            </div>
                            </div>
                    </CardBody>
                    </Card>
                    </Col>
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
          
        </Row>
            </Container>
            
            </div>
        </div>
    );
}

export default AllProducts;
