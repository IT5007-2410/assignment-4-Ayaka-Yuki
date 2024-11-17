import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { RFValue } from 'react-native-responsive-fontsize'; 
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
    TouchableOpacity
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
  const {height, width} = Dimensions.get('window'); 
  const headerHeight = 0.1 * height;
  const StatusType = {
    NEW: 'New',
    ASSIGNED: 'Assigned',
    FIXED: 'Fixed',
    CLOSED: 'Closed',
  };
  
  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <Text>
        {/****** Q1: Start Coding here. ******/}
        Issue Filter Placeholder
        {/****** Q1: Code ends here ******/}
        </Text>
      );
    }
}

const styles = StyleSheet.create({
  sectionStyle: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    paddingTop: headerHeight * 1.1, 
  },
  tableStyle: {
    flex: 1,
    width: width,
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
    alignContent: 'center',
  },
  cellStyle: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    flex: 1,
  },
  headerCell: {
    borderColor: 'black',
    borderWidth: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(12),
  },
  header: {
    height: headerHeight,
    backgroundColor: '#333',
    width: '100%',
    position: 'absolute',
    zIndex: 999,
    top: 0,
    paddingHorizontal: 10, 
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: headerHeight, 
    width: width, 
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: headerHeight * 0.1,
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: 'white',
  },
  navMobile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ul: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  li: {
    marginRight: width * 0.01, 
  },
  link: {
    fontSize: RFValue(10),
    color: 'white',
    textAlign: 'center',

    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.01, 
    textDecorationLine: 'none',
  },
  hovered: {
    backgroundColor: 'white',
  },
  default: {
    backgroundColor: '#333',
  },
  linkHovered: {
    color: 'black',
  },
  linkNormal: {
    color: 'white', 
  },
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '50%',
    width: width, 
    maxWidth: '80%',
    paddingRight: 16,
    paddingLeft: 16,  
  },

  formGroup: {
    width: '100%', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 100,
    marginBottom: 16,
    marginTop: 16,
    marginBottom: 16, 
  },

  label: {
    width: '100%',
    margin: 0,
    fontSize: RFValue(18), 
    fontWeight: 'bold',
    minWidth: 100, 
    textAlign: 'left',
    flex: 1,
  },

  input: {
    width: '100%',
    padding: 12, 
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 4,
    fontSize: RFValue(18), 
    minWidth: 220, 
  },

  button: {
    backgroundColor: '#007BFF', 
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  pickerContainer: {
    position: 'absolute',
    top: '50%', 
    left: '10%',
    right: '10%',
    backgroundColor: '#fff',
    borderRadius: 10,
    zIndex: 999, 
    padding: 10,
    elevation: 10, 
  },
  textInputText: {
    fontSize: RFValue(18), 
    color: 'black', 
  }
  });

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    const rowData = [
      issue.id,
      issue.title,
      issue.status,
      issue.owner,
      issue.created?.toLocaleDateString(),
      issue.effort,
      issue.due?.toLocaleDateString(),
    ];
    {/****** Q2: Coding Ends here.******/}
    return (
      <View style={styles.tableRow}>
      {rowData.map((value, index) => (
        <Text key={index} style={[styles.cellStyle, { width: getColumnWidth(index) }]}>
          {value}
        </Text>
      ))}
    </View>   
    );
  }

  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const tableHeader = ['ID', 'Title', 'Status', 'Owner', 'Created', 'Effort', 'Due'];
    {/****** Q2: Coding Ends here. ******/}
    
    
    return (
      <ScrollView horizontal={true} style={styles.tableStyle}>
        {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
      <View>
        {/* Table Header */}
        <View style={styles.tableRow}>
          {tableHeader.map((header, index) => (
            <Text key={index} style={[styles.headerCell, { width: getColumnWidth(index) }]}>
              {header}
            </Text>
          ))}
        </View>

        {/* Table Rows */}
        <ScrollView style={{ flex: 1 }}>
          {issueRows}
        </ScrollView>
      </View>
      {/****** Q2: Coding Ends here. ******/}
    </ScrollView>
  );
  }
  function getColumnWidth(index) {
    const widths = [100, 300, 100, 100, 150, 100, 100];
    return widths[index];
  }
  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
       /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = {
        title: '',
        status: 'New',
        owner: null,
        effort: null,
        due: null,
        showDatePicker: false,
        showPicker: false,
      };
       /****** Q3: Code Ends here. ******/
    }
    
     /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleChange = (name, value) => {
      if (name === 'due') {
        this.setState({ due: value });
      } else if (name === 'effort') {
        if (value === '') {
          this.setState({ effort: null });
        } else {
          const numericValue = parseInt(value, 10);
          if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 1000) {
            this.setState({ effort: numericValue });
          }
        }
      } else if (name === 'status') {
        this.setState({ status: value });
      } else {
        this.setState({ [name]: value });
      }
    };
    /****** Q3: Code Ends here. ******/
  
    handleSubmit() {
        /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const { title, status, owner, effort, due } = this.state;
      const dueDate = due instanceof Date ? due : null;
      const issue = {
        title,
        status,
        owner,
        effort: parseInt(effort, 10),
        due: dueDate,
      };
      this.props.createIssue(issue);
      this.setState({
        title: '',
        status: 'New',
        owner: null,
        effort: null,
        due: null,
        showDatePicker: false,
        showPicker: false,
      });
       /****** Q3: Code Ends here. ******/
    }
  
    render() {
      return (
        <View style={styles.formContainer}>
           {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          {/* Title Field */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={this.state.title}
              onChangeText={(text) => this.handleChange('title', text)}
            />
          </View>
  
          {/* Status Field */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Status</Text>
  
            {/* Container for TextInput and Picker */}
            <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center' }]}>
              {/* TouchableOpacity to open the Picker */}
              <TouchableOpacity style={[styles.input, { justifyContent: 'center', alignItems: 'flex-start' }]} onPress={() => this.setState({ showPicker: !this.state.showPicker })}>
                <Text style={styles.textInputText}>{this.state.status}</Text>
              </TouchableOpacity>
  
              {/* Show Picker if showPicker is true */}
              {this.state.showPicker && (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={this.state.status}
                    onValueChange={(itemValue) => {
                      this.handleChange('status', itemValue);
                      this.setState({ showPicker: false }); // Close the picker after selection
                    }}
                  >
                    <Picker.Item label="New" value="New" />
                    <Picker.Item label="Assigned" value="Assigned" />
                    <Picker.Item label="Fixed" value="Fixed" />
                    <Picker.Item label="Closed" value="Closed" />
                  </Picker>
                </View>
                )}
            </View>
          </View>
  
          {/* Owner Field */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Owner</Text>
            <TextInput
              style={styles.input}
              placeholder="Owner"
              value={this.state.owner}
              onChangeText={(text) => this.handleChange('owner', text)}
            />
          </View>
  
          {/* Effort Field */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Effort</Text>
            <TextInput
              style={styles.input}
              placeholder="Effort"
              value={this.state.effort !== null ? this.state.effort.toString() : ''}
              onChangeText={(text) => this.handleChange('effort', text)}
              keyboardType="numeric"
            />
          </View>
  
          {/* Due Date Field */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Due Date</Text>
            <TouchableOpacity style={[styles.input, { justifyContent: 'center', alignItems: 'flex-start' }]}
              onPress={() => this.setState({ showDatePicker: true })}
            >
              <Text  style={styles.textInputText}>{this.state.due ? this.state.due.toLocaleDateString() : 'Select a date'}</Text>
            </TouchableOpacity>
  
            {/* Show Date Picker */}
            {this.state.showDatePicker && (
              <DatePicker
                modal
                open={this.state.showDatePicker}
                date={this.state.due || new Date()}
                minimumDate={new Date()}
                onConfirm={(date) => {
                  this.setState({ due: date, showDatePicker: false });
                }}
                onCancel={() => this.setState({ showDatePicker: false })}
              />
            )}
          </View>
  
          {/* Submit Button */}
          <View style={styles.formGroup}>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          {/****** Q3: Code Ends here. ******/}
        </View>
      );
    }
  }
  
/*edit later*/
class BlackList extends React.Component {
    constructor()
    {   super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = {
          blacklist: [],
          currentInput: ""
      };
        /****** Q4: Code Ends here. ******/
    }
    componentDidMount() {
      this.loadData();
      }
  
    async loadData() {
    const query = `query {
        blackList{
        name}
    }`;

    const data = await graphQLFetch(query);
    if (data && data.blackList) {
      this.setState({ blacklist: data.blackList },() => {
        // This callback will be executed after the state is updated
        console.log('Updated blacklist from state:', this.state.blacklist);
      });;
      console.log('blacklist:', data.blackList);
  } else {
      console.error('Error: No data found or data structure is incorrect');
  }
    }
  
  
    async addtoblacklist(name){
      const query = `mutation addToBlacklist($name: String!) {
          addToBlacklist(nameInput: $name)
      }`;

      const data = await graphQLFetch(query, { name });
      if (data) {
          this.loadData();
      }
    }

    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleInputChange = (text) => {
      this.setState({ currentInput: text });
  };
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    const { currentInput } = this.state;

        if (currentInput.trim() === "") {
            alert("Input cannot be empty!");
            return;
        }

        this.addtoblacklist(currentInput);

        this.setState({
            currentInput: ""
        });
        console.log("Blacklisted:", currentInput);
    /****** Q4: Code Ends here. ******/
    }

    render() {
    const { blacklist, currentInput } = this.state;
    return (
        <View style={styles.formContainer}>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Blacklist</Text>
            <TextInput
              placeholder="Enter a name to blacklist"
              value={currentInput}
              onChangeText={this.handleInputChange}
              style={styles.input}
            />
          </View>

        <View style={styles.formGroup}>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Add to Blacklist</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Blacklisted Names:</Text>
          {blacklist.map((item, index) => (
            <Text key={index} style={{ marginTop: 5 }}>
              {index + 1}. {item.name} {/* Access name property */}
            </Text>
          ))}
        </View>

        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

class Header extends React.Component {
  constructor() {
    super();
    this.state = { hoveredButton: null };
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  handlePressIn(index) {
    this.setState({ hoveredButton: index });
  }

  handlePressOut() {
    this.setState({ hoveredButton: null });
  }

  render() {
    const { hoveredButton } = this.state;

    return (
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>Issue Tracker</Text>
          </View>
          <View style={styles.navMobile}>
            <View style={styles.ul}>
              {['Issue Filter', 'Display Issues', 'Add an Issue', 'Blacklist Owner'].map(
                (label, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.li,
                      hoveredButton === index ? styles.hovered : styles.default,
                    ]}
                    onPress={() => this.props.onSelect(index + 1)}
                    onPressIn={() => this.handlePressIn(index)}
                    onPressOut={() => this.handlePressOut()}
                  >
                    <Text
                      style={[
                        styles.link,
                        hoveredButton === index ? styles.linkHovered : styles.linkNormal,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [], selector : 1};
        this.createIssue = this.createIssue.bind(this);
        this.setSelector = this.setSelector.bind(this);
    }

    setSelector(value)
  {
	  this.setState({selector: value});
  }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;
    

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }

    async blacklist(name){
      const query = `mutation addToBlacklist($name: String!) {
          blacklist(name: $name) {
          name
          }
      }`;

      const data = await graphQLFetch(query, { name });
      if (data) {
          this.loadData();
      }
    }
    
    
    render() {
    return (
    <SafeAreaView style={styles.sectionStyle}>
    <Header onSelect={this.setSelector}></Header>
    <View>
    {/****** Q1: Start Coding here. ******/}
    {this.state.selector === 1 && (<IssueFilter/>)}
    {/****** Q1: Code ends here ******/}


    {/****** Q2: Start Coding here. ******/}
    {this.state.selector === 2 && (<IssueTable issues={this.state.issues} />)}
    {/****** Q2: Code ends here ******/}

    
    {/****** Q3: Start Coding here. ******/}
    {this.state.selector === 3 && (<IssueAdd createIssue={this.createIssue} />)}
    {/****** Q3: Code Ends here. ******/}

    {/****** Q4: Start Coding here. ******/}
    {this.state.selector === 4 && (<BlackList/>)}
    {/****** Q4: Code Ends here. ******/}
    </View>
    </SafeAreaView>
      
    );
  }
}
