import React, { Component, Fragment } from "react";
import { Col, Row,Card } from "react-materialize";
import Header from "../../components/applicationComponent/header";
import Footer from "../../components/applicationComponent/footer";
import SideNav from "../../components/applicationComponent/sideNav";
import Breadcrumbs from "../../components/applicationComponent/breadcrumbs";
class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div id="main">
          <div className="wrapper">
            <aside id="left-sidebar-nav">
              <SideNav />
            </aside>
            <section id="content">
              <Breadcrumbs />
              <Col className="container">
                <div className="section">
                  <p className="caption">A Simple Blank Page to use it for your custome design and elements.</p>
                  <div className="divider"></div>
                  <div className="row">
                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5">add_shopping_cart</i>
                            <p>Orders</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0">690</h5>
                            <p className="no-margin">New</p>
                            <p>6,00,00</p>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5">add_shopping_cart</i>
                            <p>Orders</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0">690</h5>
                            <p className="no-margin">New</p>
                            <p>6,00,00</p>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5">add_shopping_cart</i>
                            <p>Orders</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0">690</h5>
                            <p className="no-margin">New</p>
                            <p>6,00,00</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col s12 m6 l3">
                      <div className="card gradient-45deg-light-blue-cyan gradient-shadow min-height-100 white-text">
                        <div className="padding-4">
                          <div className="col s7 m7">
                            <i className="material-icons background-round mt-5">add_shopping_cart</i>
                            <p>Orders</p>
                          </div>
                          <div className="col s5 m5 right-align">
                            <h5 className="mb-0">690</h5>
                            <p className="no-margin">New</p>
                            <p>6,00,00</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="row">
    <div className="col s12 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div className="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
<Row>
  <Col s={12} m={6} l={4}>
    <Card className='blue-grey darken-1' textClassName='white-text' title='Card title' actions={[<a href='#'>This is a link</a>]}>
    I am a very simple card.
    </Card>
</Col>
</Row>
              </Col>
            </section>
          </div>
        </div>

        <Footer />
      </Fragment>
    );
  }
}
export default Layout;