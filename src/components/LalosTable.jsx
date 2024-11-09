import {
    Button,
    Collapse,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useLayout } from "../context/System/LayoutContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import { esES } from "@mui/material/locale";
import getObjectValue from "lodash.get";

export default function LalosTable(props) {
    const {
        data,
        columns,
        id,
        row,
        setRow,
        defaultRow,
        fnDoubleClick,
        fnMiddleClick,
        disableStickyHeader,
        SubRow,
    } = props;
    const pager = [10, 50, 200, 1000];

    const theme = createTheme(esES);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pager[0]);
    const [dataRows, setDataRows] = useState(data);
    const [filters, setFilters] = useState({});
    const [orderBy, setOrderBy] = useState("");
    const [order, setOrder] = useState(true);

    const { tablaReferencia } = useLayout();

    //Cambiar de pagina
    const handleChangePage = (e, page) => {
        setPage(page);
    };

    //Cambiar las filas por pagina
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setPage(0);
    };

    //Capturar al escribir en los filtros
    const handleChangeFilter = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
        setPage(0);
    };

    //Ordenar tabla
    const handleClickOrder = (field) => {
        const orderField = field === orderBy ? !order : order;

        const orderList = orderField
            ? dataRows.sort((a, b) => {
                  const valueA = getObjectValue(a, field);
                  const valueB = getObjectValue(b, field);
                  // return a[field as U] < b[field as U] ? -1 : a[field as U] > b[field as U] ? 1 : 0
                  return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
              })
            : dataRows.sort((a, b) => {
                  const valueA = getObjectValue(a, field);
                  const valueB = getObjectValue(b, field);
                  // return a[field as U] < b[field as U] ? 1 : a[field as U] > b[field as U] ? -1 : 0
                  return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
              });

        setDataRows(orderList);

        if (field === orderBy) {
            setOrder(orderField);
            return;
        }

        setOrderBy(field);
    };

    //Al hacer clic en un fila de la tabla
    const handleClickRow = (valueRow) => () => {
        if (!defaultRow) {
            setRow(valueRow);
            return;
        }

        if (!row) {
            setRow(valueRow);
            return;
        }

        if (valueRow[id] === row[id]) {
            setRow(defaultRow);
            return;
        }

        setRow(valueRow);
    };

    const handleClickMiddleMouseButton = (e, valueRow) => {
        if (e.button === 1) {
            // if (!defaultRow) {
            //     setRow(valueRow);
            //     return;
            // }

            // if (!row) {
            //     setRow(valueRow);
            //     return;
            // }

            // if (valueRow[id] === row[id]) {
            //     setRow(defaultRow);
            //     return;
            // }

            // setRow(valueRow);

            // console

            fnMiddleClick(valueRow);
        }
    };

    //Crear objecto de filtro
    useEffect(() => {
        const filterObj = {};

        columns.forEach((column) => {
            filterObj[column.field] = "";
        });

        setFilters(filterObj);
        // eslint-disable-next-line
    }, []);

    //Filtrar al escribir
    useEffect(() => {
        const keys = Object.keys(filters);
        const values = Object.values(filters);

        if (keys.length <= 0) {
            return;
        }

        if (values.every((x) => x === "")) {
            setDataRows(data);
            return;
        }

        let filterList = [...data];
        keys.forEach((key, i) => {
            const filterText = values[i].trim().toUpperCase();

            if (filterText === "") {
                return;
            }

            filterList = filterList.filter((x) => {
                const valueKey = getObjectValue(x, key, null);
                // return !x[key as U] ? false : x[key as U].toString().toUpperCase().includes(filterText);
                return !valueKey ? false : valueKey.toString().toUpperCase().includes(filterText);
            });
        });

        setDataRows(filterList);
        // eslint-disable-next-line
    }, [filters]);

    //Actualizar datos originales
    useEffect(() => {
        setDataRows(data);
        const filterObj = { ...filters };
        const keys = Object.keys(filterObj);

        if (keys.length > 0) {
            keys.forEach((key) => {
                filterObj[key] = "";
            });
        }

        setFilters(filterObj);
        // eslint-disable-next-line
    }, [data]);
    // console.log(tablaReferencia);
    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <TableContainer
                    className="pizzeria-table"
                    sx={{ maxHeight: !disableStickyHeader ? "calc(100vh - 200px)" : "initial" }}
                    component={Paper}
                >
                    <Table size="small" ref={tablaReferencia} stickyHeader={!disableStickyHeader}>
                        <TableHead>
                            <TableRow>
                                {SubRow && <TableCell></TableCell>}
                                {columns.map((column, i) => (
                                    <TableCell
                                        key={i}
                                        style={{
                                            minWidth: !column.width ? "initial" : column.width,
                                            verticalAlign: "top",
                                        }}
                                    >
                                        {!column.hideSort && (
                                            <Button
                                                style={{
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textTransform: "none",
                                                    fontSize: "large",
                                                }}
                                                variant="text"
                                                color="inherit"
                                                className={orderBy === column.field ? "sort" : "no-sort"}
                                                onClick={() => handleClickOrder(column.field)}
                                                // startIcon={
                                                //   orderBy === column.field ? (
                                                //     order ? (
                                                //       <ArrowUpwardIcon />
                                                //     ) : (
                                                //       <ArrowDownwardIcon />
                                                //     )
                                                //   ) : (
                                                //     <ArrowUpwardIcon />
                                                //   )
                                                // }
                                            >
                                                {column.title}
                                            </Button>
                                        )}
                                        {!column.hideFilter && (
                                            <TextField
                                                name={column.field}
                                                placeholder={"Buscar" /*+ column.title + "..."*/}
                                                onChange={handleChangeFilter}
                                                autoComplete="off"
                                                value={!filters[column.field] ? "" : filters[column.field]}
                                                size="small"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                        {column.showRenderHeader && column.renderHeader()}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {/* <TableRow>
                        {columns.map((column, i) => (
                            <TableCell key={i}>
                            </TableCell>
                        ))}
                    </TableRow> */}
                        </TableHead>
                        <TableBody>
                            {dataRows.length > 0 ? (
                                dataRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((dataRow, i) =>
                                    SubRow ? (
                                        <RowWithSubRow
                                            dataRow={dataRow}
                                            onClick={handleClickRow(dataRow)}
                                            onDoubleClick={!fnDoubleClick ? () => {} : fnDoubleClick}
                                            onMouseDown={
                                                !fnMiddleClick
                                                    ? () => {}
                                                    : (e) => handleClickMiddleMouseButton(e, dataRow)
                                            }
                                            row={row}
                                            id={id}
                                            columns={columns}
                                            SubRow={SubRow}
                                        />
                                    ) : (
                                        <TableRow
                                            key={i}
                                            onClick={handleClickRow(dataRow)}
                                            onDoubleClick={!fnDoubleClick ? () => {} : fnDoubleClick}
                                            onMouseDown={
                                                !fnMiddleClick
                                                    ? () => {}
                                                    : (e) => handleClickMiddleMouseButton(e, dataRow)
                                            }
                                            className={!row ? "no-row" : dataRow[id] === row[id] ? "row" : "no-row"}
                                        >
                                            {columns.map((column, j) => (
                                                <TableCell key={j}>
                                                    {!column.render ? dataRow[column["field"]] : column.render(dataRow)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    )
                                )
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <Typography>No se encontraron registros para mostrar</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        {/* <TableFooter>
                    <TableRow>
                    </TableRow>
                </TableFooter> */}
                    </Table>
                </TableContainer>
                {props.disablePager !== true ? (
                    <TablePagination
                        count={dataRows.length}
                        component="div"
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={pager}
                        labelRowsPerPage="Registros por página"
                    />
                ) : (
                    <div></div>
                )}
            </ThemeProvider>
        </Fragment>
    );
}

function RowWithSubRow({ dataRow, onClick, onDoubleClick, onMouseDown, row, id, columns, SubRow }) {
    const [show, setShow] = useState(false);

    const handleClickShow = () => {
        setShow(true);
    };

    const handleClickHide = () => {
        setShow(false);
    };

    return (
        <Fragment>
            <TableRow
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onMouseDown={onMouseDown}
                className={!row ? "no-row" : dataRow[id] === row[id] ? "row" : "no-row"}
            >
                <TableCell>
                    {show && (
                        <IconButton onClick={handleClickHide}>
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    )}
                    {!show && (
                        <IconButton onClick={handleClickShow}>
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    )}
                </TableCell>
                {columns.map((column, j) => (
                    <TableCell key={j}>{!column.render ? dataRow[column["field"]] : column.render(dataRow)}</TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell colSpan={columns.length + 1} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={show}>
                        <SubRow row={dataRow} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

// interface MgaTableProps<T> {
//     data: T[];
//     columns: MgaTableColumn<T>[];
//     id: string;
//     row: T;
//     setRow: (value: T) => void;
//     defaultRow?: T;
//     fnDoubleClick?: () => void;
// }

// interface MgaTableColumn<T> {
//     field: string;
//     title: string;
//     render?: (row: T) => JSX.Element | string;
//     hideFilter?: boolean;
//     hideSort?: boolean;
// }

LalosTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string,
            title: PropTypes.string,
            render: PropTypes.func,
            hideFilter: PropTypes.bool,
            hideSort: PropTypes.bool,
            width: PropTypes.number,
            renderHeader: PropTypes.func,
        })
    ),
    data: PropTypes.array,
    defaultRow: PropTypes.object,
    fnDoubleClick: PropTypes.func,
    fnMiddleClick: PropTypes.func,
    id: PropTypes.string,
    row: PropTypes.object,
    setRow: PropTypes.func,
    disableStickyHeader: PropTypes.bool,
};
