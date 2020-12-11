import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        borderRadius: 0
    },
    // ["@media (height:640px) and (width:360px)"]: {
		// 	overflowX: "auto",
		// 	position: 'relative'
		// },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SimpleTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead style={{ backgroundColor: '#d3d3d3' }}>
                    <TableRow>
                        <TableCell align="left">NUMBER OF CARDS</TableCell>
                        <TableCell align="left">ORGANISATION</TableCell>
                        <TableCell align="left">DATE</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="left" component="th" scope="row">
                                100
                            </TableCell>
                            <TableCell align="left">ICIL</TableCell>
                            <TableCell align="left">12-02-2020</TableCell>
                            <TableCell align="center"><a href='#' style={{textAlign:'center'}}>View All</a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
