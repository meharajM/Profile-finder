import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import 'bootstrap/less/bootstrap.less';


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
//the fallowing code would make the app to work without the router. i.e. search and filter will work without sending any requests to the api search and filetr in local data

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
	const companyFilter = companyList.map((company)=>{
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
	const locationFilter = locationList.map((location)=>{
		return(<option>{location}</option>);
	});
	return(<select name='filterLocation' onChange={props.whenChanged}>
			<option></option>
			{locationFilter}
		</select>);
}

function SearchName(props){
	return(<input name="searchName" type="text" placeholder="search name" onChange={props.whenChanged}/>);
}
function Header(props){
	let count = props.filterCompany != 'all' ? 1 : 0;
	count = props.filterLocation != 'all' ? count + 1 : count;
	count = props.searchName != '' ? count + 1 : count;  
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
					<span><Button bsStyle='success' bsSize='large'>Get started today</Button>
					</span>
			</div>
		);

}

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'filterCompany': 'all',
			'filterLocation': 'all',
			'searchName': ''
		};
		this.handleFilterChange = this.handleFilterChange.bind(this);
	}
	handleFilterChange(event){
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name]: value
		});
	}
	render(){
		const candidates = this.props.candidates;
		let companyList = [];
		let locationList = [];
		const filterCompany = this.state.filterCompany;
		const filterLocation = this.state.filterLocation;
		const searchName = this.state.searchName;
		const candidateList = candidates.map((candidate) => {
			companyList.push(candidate.current_company);
			locationList.push(candidate.current_location);
			if((filterCompany === 'all' || filterCompany === candidate.current_company) && (filterLocation === 'all' || filterLocation === candidate.current_location) && (searchName === '' || (candidate.first_name+candidate.last_name).toLowerCase().indexOf(searchName.toLowerCase()) > -1 )) {
				return(<div className="candidate"><Candidate key={candidate.uid} candidate={candidate}/></div>)
			}			
		});
		return(
			<Grid>
				<div>
					<Row>
					<Col xs={12}>
						<Col md={8} sm={12}><Header filterCompany={filterCompany} filterLocation={filterLocation} searchName={searchName}/> </Col>
						<Col md={4} sm={12}><SearchName whenChanged={this.handleFilterChange}/></Col>	
					</Col>
					<CompanyFilter companyList={companyList} whenChanged={this.handleFilterChange}/>	
					<LocationFilter locationList={locationList} whenChanged={this.handleFilterChange}/>		
					
					</Row>	
				</div>			
				<div className="container">{candidateList}</div>
			</Grid>
			);
	}
}



var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://104.199.147.85/candidates', true);
xhr.responseType = 'json';
xhr.onload = function(e) {
  if (this.status == 200) {
  	debugger
  	ReactDOM.render(
  		<App candidates={this.response.candidates}/>,
  		document.getElementById('root')
  	);
  }
};
xhr.send();