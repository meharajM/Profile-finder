import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

//import App from './App';
import './index.css';
/*
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
				<img src={candidate.profile_picture} />
				<div>{candidate.first_name+" "+candidate.last_name}</div>
				<div><span>{candidate.current_role}</span> at {candidate.current_company}</div>
				<div>({candidate.total_experience})</div>
				<div>{candidate.current_location}</div>
				<div>Worked at:<span><Experience experience={candidate.experience}/></span></div>
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
				{Button}			
			</div>
		);
}
function SelectedFilter(props){
	return(
			<div>
					<span>Showing Candidates from 
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
		debugger
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
				return(<div><Candidate key={candidate.uid} candidate={candidate}/></div>)
			}			
		});
		return(
			<div>
				<div>
					<Header filterCompany={filterCompany} filterLocation={filterLocation} searchName={searchName}/> 				
					<CompanyFilter companyList={companyList} whenChanged={this.handleFilterChange}/>	
					<LocationFilter locationList={locationList} whenChanged={this.handleFilterChange}/>		
					<SearchName whenChanged={this.handleFilterChange}/>		
				</div>			
				<div>{candidateList}</div>
			</div>
			);
	}
}
const candidates = [
					{  "first_name": "raj", 
							    "last_name": "Sharma", 
							    "profile_picture": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/216/049/207567b.jpg", 
							    "total_experience": 60.0, 
							    "uid": "00018b75-6d55-4754-be8d-f065f1bbf6d7",
								"current_company": "Fractal Analytics", 
							    "current_location": "delhi", 
							    "current_role": "Big Data and Analytics Engineer",
							    "experience": [
										        {
										            "added_at": "2016-08-18T04:57:29+00:00", 
										            "company": "Fractal Analytics", 
										            "company_link": null, 
										            "description": "Big Data capability development at Fractal responsible for solution development for analytical problems across multiple business domains at large scale", 
										            "duration_string": "", 
										            "end": null, 
										            "is_current": true, 
										            "role": "Big Data and Analytics Engineer", 
										            "start": "2016-02-01T00:00:00+00:00"
										        }, 
										        {
										            "added_at": "2016-08-18T04:57:29+00:00", 
										            "company": "Amadeus IT Group", 
										            "company_link": null, 
										            "description": "1. Worked as Product Engineer in developing operational data store for Airlines.2. Worked with kafka, Spark Streaming, Data Frames & Cassandra.3. Involved in architectural decisions of ETL and DB.4. End to End development and evaluating the performance of the product.5. Ensure data integrity and fault-tolerance.6. Resolved technical issues pertaining to Concurrent writes, handling write failures, shuffle issues, memory issues etc.7. Deep expertise in tuning internals of Spark.8. Research on technical aspects that would be applicable for the product.", 
										            "duration_string": "8 months", 
										            "end": "2016-02-01T00:00:00+00:00", 
										            "is_current": false, 
										            "role": "Research and Development Engineer-BigData", 
										            "start": "2015-06-01T00:00:00+00:00"
										        }, 
										        {
										            "added_at": "2016-08-18T04:57:29+00:00", 
										            "company": "Impetus", 
										            "company_link": null, 
										            "description": "1. Worked as Research Engineer in Big Data Labs2. Worked with Real time analytics projects.3. Worked on Hadoop ecosystem and related POCs4.  Contributor to Apache Storm. Implemented ML algorithms over Storm.5. Implemented large scale deep networks over Spark.6. Implemented realization of deep learning for NLP tasks over Spark.Experimented on Text Mining, Data Mining, Information Retrieval, Neural Networks and NLP.", 
										            "duration_string": "1 year, 9 months", 
										            "end": "2015-06-01T00:00:00+00:00", 
										            "is_current": false, 
										            "role": "Research Engineer", 
										            "start": "2013-09-01T00:00:00+00:00"
										        }, 
										        {
										            "added_at": "2016-08-18T04:57:29+00:00", 
										            "company": "Tata Consultancy Services", 
										            "company_link": null, 
										            "description": "1. Worked on ETL tools \u2013 MS SQL Server Integration services (SSIS) and reporting tools SQL Server Reporting Services (SSRS)2. Worked on evaluating the performance of SQL Server 2008 R2 on Windows Server 2012.3. Worked as SQL developer. Developed many optimized SQL queries.4. Experience in resolving memory issues and Performance tuning of SQL queries", 
										            "duration_string": "2 years", 
										            "end": "2013-08-01T00:00:00+00:00", 
										            "is_current": false, 
										            "role": "System Engineer", 
										            "start": "2011-08-01T00:00:00+00:00"
										        }
										    ]
						},
						{  "first_name": "Sanjay", 
							    "last_name": "Sharma", 
							    "profile_picture": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/216/049/207567b.jpg", 
							    "total_experience": 60.0, 
							    "uid": "00018b75-6d55-4754-be8d-f065f1bbf6d7",
								"current_company": "Fractal Analytics", 
							    "current_location": "Bengaluru", 
							    "current_role": "Big Data and Analytics Engineer",
							    "experience": [
										        {
										            "added_at": "2016-08-18T04:57:29+00:00", 
										            "company": "Fractal Analytics", 
										            "company_link": null, 
										            "description": "Big Data capability development at Fractal responsible for solution development for analytical problems across multiple business domains at large scale", 
										            "duration_string": "", 
										            "end": null, 
										            "is_current": true, 
										            "role": "Big Data and Analytics Engineer", 
										            "start": "2016-02-01T00:00:00+00:00"
										        }, 
										        {
										            "added_at": "2016-08-18T04:57:29+00:00", 
										            "company": "Amadeus IT Group", 
										            "company_link": null, 
										            "description": "1. Worked as Product Engineer in developing operational data store for Airlines.2. Worked with kafka, Spark Streaming, Data Frames & Cassandra.3. Involved in architectural decisions of ETL and DB.4. End to End development and evaluating the performance of the product.5. Ensure data integrity and fault-tolerance.6. Resolved technical issues pertaining to Concurrent writes, handling write failures, shuffle issues, memory issues etc.7. Deep expertise in tuning internals of Spark.8. Research on technical aspects that would be applicable for the product.", 
										            "duration_string": "8 months", 
										            "end": "2016-02-01T00:00:00+00:00", 
										            "is_current": false, 
										            "role": "Research and Development Engineer-BigData", 
										            "start": "2015-06-01T00:00:00+00:00"
										        }, 
										        {
										            "added_at": "2016-08-18T04:57:29+00:00", 
										            "company": "Impetus", 
										            "company_link": null, 
										            "description": "1. Worked as Research Engineer in Big Data Labs2. Worked with Real time analytics projects.3. Worked on Hadoop ecosystem and related POCs4.  Contributor to Apache Storm. Implemented ML algorithms over Storm.5. Implemented large scale deep networks over Spark.6. Implemented realization of deep learning for NLP tasks over Spark.Experimented on Text Mining, Data Mining, Information Retrieval, Neural Networks and NLP.", 
										            "duration_string": "1 year, 9 months", 
										            "end": "2015-06-01T00:00:00+00:00", 
										            "is_current": false, 
										            "role": "Research Engineer", 
										            "start": "2013-09-01T00:00:00+00:00"
										        }, 
										        {
										            "added_at": "2016-08-18T04:57:29+00:00", 
										            "company": "Tata Consultancy Services", 
										            "company_link": null, 
										            "description": "1. Worked on ETL tools \u2013 MS SQL Server Integration services (SSIS) and reporting tools SQL Server Reporting Services (SSRS)2. Worked on evaluating the performance of SQL Server 2008 R2 on Windows Server 2012.3. Worked as SQL developer. Developed many optimized SQL queries.4. Experience in resolving memory issues and Performance tuning of SQL queries", 
										            "duration_string": "2 years", 
										            "end": "2013-08-01T00:00:00+00:00", 
										            "is_current": false, 
										            "role": "System Engineer", 
										            "start": "2011-08-01T00:00:00+00:00"
										        }
										    ]
						}
					]
ReactDOM.render(
  <App candidates={candidates}/>,
  document.getElementById('root')
);
