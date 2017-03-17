import React from 'react'
import { Card } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import * as API from '../API.js'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IncomeView from '../components/incomeview.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class Incomes extends React.Component {
    state = {
        selectedItem: null,
        category: 0,
        data: []
    }

    componentWillMount() {
        document.title = "Income"
        API.Income.search().then(res => {
            this.setState({
                data: res
            })
        })
    }

    rowSelect = (rowNumber, columnId) => {
        this.setState({selectedItem: this.state.data[rowNumber]});
    }

    catSelect = (event, value) => {
        this.setState({category: value})
    }

    closeIndivDialog = () => {
        this.setState({selectedItem: null});
    }

    render() {
        const fabStyle = {
            margin: 0,
            top: 'auto',
            right: 24,
            bottom: 64,
            left: 'auto',
            position: 'fixed',
        }

        return (
            <div>
                <FloatingActionButton secondary={true} style={fabStyle}><ContentAdd /></FloatingActionButton>
                <Card style={{ width: '80%', marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }}>
                    <DropDownMenu value={this.state.category} onChange={this.catSelect} style={{paddingHeight: 8}}>
                        <MenuItem value={0} primaryText="All Incomes" />
                        <MenuItem value={1} primaryText="My Incomes" />
                    </DropDownMenu>
                </Card>
                <Card style={{ width: '80%', marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }}>
                    {/*TEMPORARILY SINGLE-SELECT, SHOULD BE MULTI-SELECT LATER*/}
                    <Table
                        fixedHeader={true}
                        selectable={true}
                        multiSelectable={false}
                        onCellClick={this.rowSelect}>
                        <TableHeader
                            displaySelectAll={true}
                            adjustForCheckbox={true}>
                            <TableRow>
                                <TableHeaderColumn tooltip="Organization">Organization</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Year">Year</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Username">Username</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Source">Source</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Type">Type</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Amount">Amount</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Item">Item</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Comments">Comments</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={true}
                            deselectOnClickaway={true}
                            showRowHover={true}>
                            {this.state.data.map((row, index) => (
                                <TableRow key={row.incomeid}>
                                    <TableRowColumn>{row.organization}</TableRowColumn>
                                    <TableRowColumn>{row.year}</TableRowColumn>
                                    <TableRowColumn>{row.username}</TableRowColumn>
                                    <TableRowColumn>{row.source}</TableRowColumn>
                                    <TableRowColumn>{row.type}</TableRowColumn>
                                    <TableRowColumn>{row.amount}</TableRowColumn>
                                    <TableRowColumn>{row.item}</TableRowColumn>
                                    <TableRowColumn>{row.status}</TableRowColumn>
                                    <TableRowColumn>{row.comments}</TableRowColumn>
                                    <TableRowColumn>{row.modify}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
                <Dialog
                    title={`${document.title} / View`}
                    actions={[
                        <FlatButton
                            label="Close"
                            primary={true}
                            keyboardFocused={true}
                            onTouchTap={this.closeIndivDialog} />
                    ]}
                    modal={false}
                    open={this.state.selectedItem !== null}
                    onRequestClose={this.closeIndivDialog}
                    autoScrollBodyContent={true}>
                    <IncomeView income={this.state.selectedItem} />
                </Dialog>
            </div>
        );
    }
}
