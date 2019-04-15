import React, { Component } from 'react';
import { browseItems } from '../util/APIUtils';
import './Home.css';
import Card from '../shop/Card';

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: false,
            page_limit: 10,
            currentPage: 0,
            responseCount: 0
        }
    }

    limitPerPage (page) {
        browseItems(page)
        .then(response => {
            this.setState({
                items: response,
                loading: false,
                currentPage: page,
                responseCount: Object.keys(response).length
              });
        }).catch(error => {
            console.log('erorr')
            this.setState({
                loading: false
              });
        });
    }
    
    renderLinks() {
        var cp = this.state.currentPage
        var respCount = this.state.responseCount

        if (cp === 0 || (cp === 1 && respCount === this.state.page_limit)) {
          // show only "Page 1" and "Next"
          if(cp === 0){
                return (
                <a className="btn btn-primary" onClick={() => this.limitPerPage(cp+1)}>Category</a>
                )
            }

            if((cp === 1 && respCount === this.state.page_limit)){
                return (
                    <div>
                    <a className="btn disabled">Back</a>
                    &nbsp;&nbsp;&nbsp;&nbsp; <label>[[&nbsp;Page {(cp)}&nbsp;]]&nbsp;[[&nbsp;Items shown&nbsp;{respCount}&nbsp;]]</label> &nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="btn btn-primary" onClick={() => this.limitPerPage(cp+1)}>Next</a>
                    </div>
                )
            }
          
        }else if (respCount === this.state.page_limit) {
          // show "Back", "Page X" and "Next"
          return (
              <div>
                <a className="btn btn-primary" onClick={() => this.limitPerPage(cp-1)}>Back</a>
                &nbsp;&nbsp;&nbsp;&nbsp; <label>[[&nbsp;Page {(cp)}&nbsp;]]&nbsp;[[&nbsp;Items shown&nbsp;{respCount}&nbsp;]]</label> &nbsp;&nbsp;&nbsp;&nbsp;
                <a className="btn btn-primary"  onClick={() => this.limitPerPage(cp+1)}>Next</a>
              </div>
          )
        } else if(cp === 1 && respCount < this.state.page_limit){
            // show "Page X"
            return (
                <div>
                  <a className="btn disabled">Back</a>
                  &nbsp;&nbsp;&nbsp;&nbsp; <label>[[&nbsp;Page {(cp)}&nbsp;]]&nbsp;[[&nbsp;Items shown&nbsp;{respCount}&nbsp;]]</label> &nbsp;&nbsp;&nbsp;&nbsp;
                  <a className="btn disabled">Next</a>
                </div>
            )
        } else {
          // show "Back", "Page X"
          return (
              <div>
                <a className="btn btn-primary" onClick={() => this.limitPerPage(cp-1)}>Back</a>
                &nbsp;&nbsp;&nbsp;&nbsp; <label>[[&nbsp;Page {(cp-1)}&nbsp;]]&nbsp;[[&nbsp;Items shown&nbsp;{respCount}&nbsp;]]</label> &nbsp;&nbsp;&nbsp;&nbsp;
                <a className="btn disabled">Next</a>
              </div>
          )
        }
      }

    render() {
    return (
        <div className='content'>
            <br></br><br></br><br></br>
            {this.renderLinks()}
            <div>
                <ul>
                    {this.state && this.state.items.map(item => {
                    const { itemId } = item;

                    return <Card
                        key={itemId}
                        item={item} currentUser={this.props.currentUser}/>
                    })}
                </ul>
            </div>
        </div>
        );
    }
}

export default Browse;