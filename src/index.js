import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route} from 'react-router'
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import 'bootstrap/less/bootstrap.less';
import style from 'bootstrap/dist/css/bootstrap.css';



//import App from './App';
import './index.css';
/*
sudo npm star to run server

Components : 
  App
    Search
    Filter
      Company 
      Location
      ApliedFilters
    Candidates
      CandidatesCount
      Candidate
    
*/
	function Experience(props){
	const experience = props.experience;	
	let list = experience.map((exp)=>{return exp.company});
	return(
		<span>{list.join(', ')}</span>
		);
}
function Candidate(props){
	const candidate = props.candidate;
	return(
			<div>
				<div className='canImg'><img src={candidate.profile_picture} /></div>
				<div className='canDetails'>
					<div>{candidate.first_name+" "+candidate.last_name}</div>
					<div><span>{candidate.current_role}</span> at {candidate.current_company}</div>
					<div>({candidate.total_experience})</div>
					<div>{candidate.current_location}</div>
					<div>Worked at:<span><Experience experience={candidate.experience}/></span></div>
				</div>
			</div>
		);
}
function CompanyFilter(props){
	const companyList = props.companyList;
	const companyFilter = companyList && companyList.map((company)=>{
			return(<option>{company}</option>);
		});
	return(<select name='filterCompany' onChange={props.whenChanged}>
			<option></option>
			{companyFilter}
			</select>
		);			
}
function LocationFilter(props){
	const locationList = props.locationList;
	const locationFilter = locationList && locationList.map((location)=>{
		return(<option>{location}</option>);
	});
	return(<select name='filterLocation' onChange={props.whenChanged}>
			<option></option>
			{locationFilter}
		</select>);
}

function SearchName(props){
	return(<input name="searchName" type="text" placeholder="search name" id="searchName" onKeyUp={props.whenChanged} />);
}
function Header(props){
	let count = props.filterCompany !== 'all' ? 1 : 0;
	count = props.filterLocation !== 'all' ? count + 1 : count;
	count = props.searchName !== '' ? count + 1 : count;  
	return(
			<div className='col-xs-12'>
				<span>Candidate Search Filter</span>
				<span>Applied Filters ({count})</span>	
				<SelectedFilter />			
			</div>
		);
}
function SelectedFilter(props){
	return(
			<div>
					<span>
					</span>
			</div>
		);

}
class ShowFilters extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            companyList: [],
            locationList: []
        };
    }
    render(){
        if(!this.state.companyList.length){
            var promise = fetch("http://104.199.147.85/meta");
                    promise.then(response => {
                        response.json().then(res => {
                          this.setState({
                                companyList : res.companies,
                                locationList : res.locations
                           });
                        })
                    });
        }
        return(
            <div>
                <CompanyFilter companyList={this.state.companyList} />
                <LocationFilter locationList={this.state.locationList} />
            </div>
        );
    }
}

class App extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		const candidates = this.props.candidates;
		let companyList = [];
		let locationList = [];
		const candidateList = candidates.map((candidate) => {
			
				return(<div className="candidate"><Candidate key={candidate.uid} candidate={candidate}/></div>)
						
		});
		return(
			<Grid>
				<div>
					<Row>
					<Col xs={12}>
						<Col md={4} sm={12}><SearchName whenChanged={this.props.handleFilterChange} searchName = {this.props.searchName}/></Col>	
					</Col>
					<ShowFilters />
					
					</Row>	
				</div>			
				<div className="container">{candidateList}</div>
			</Grid>
			);
	}
}

class Home extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.state = {
            candidates : [],
            searchName : '',
            lastSearchName : ''
        };
    }
    handleFilterChange(event){
		
		if(event.currentTarget.id === "searchName" && event.keyCode === 13){
			browserHistory.push('?name='+event.currentTarget.value);
			this.setState({
				searchName: this.props.location.query.name,
				lastSearchName: this.state.searchName
			});
		}		
	}

    render(){
    	
        if(!this.state.candidates.length || this.state.lastSearchName !== this.state.searchName){
        	var baseUrl = "http://104.199.147.85/candidates";
        	if(!!this.state.searchName){
        		baseUrl += "?query="+this.state.searchName;
        	}
            var promise = fetch(baseUrl);
                    promise.then(response => {
                        response.json().then(res => {
                           this.setState({
                            candidates : res.candidates,
                            lastSearchName: this.state.searchName
                           });
                        })
                    })
        }
        return(
            <div>
               <App candidates = {this.state.candidates} location = {this.props.location} handleFilterChange = {this.handleFilterChange} searchName = {this.state.searchName}/>
            </div>
        );
    }
}
ReactDOM.render(
	  		<Router history = {browserHistory}>
	  		    <Route path="/" component = {Home}/>
	  		</Router>,
	  		document.getElementById('root')
  		);

//var promise = fetch("http://104.199.147.85/candidates");
//promise.then(response => {
//	response.json().then(res => {
//		ReactDOM.render(
//	  		<App candidates = {res.candidates}/>,
//	  		document.getElementById('root')
//  		);
//	})
//	console.log(response);
//});

