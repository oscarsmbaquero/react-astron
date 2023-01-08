
// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import Badge from "react-bootstrap/Badge";
// import { Create } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
// import { Link } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";




// const Pruebas =({avisos}) => {

//     const [columns, setColumns] = useState([]);
// 	const [filterText, setFilterText] = React.useState('');
// 	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
// 	const filteredItems = avisos.filter(
// 		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
// 	);

// 	const subHeaderComponentMemo = React.useMemo(() => {
// 		const handleClear = () => {
// 			if (filterText) {
// 				setResetPaginationToggle(!resetPaginationToggle);
// 				setFilterText('');
// 			}
// 		};

//         setColumns([
//             {
//           name: "INCIDENCIA",
//           selector: (row) => (row.n_incidencia),
//           sortable: true,
//         },
//         {
//           name: "ENTRADA",
//           selector: (row) =>
//          row.fecha_entrada.slice(0,10),
//           sortable: true,
//         },
//         {
//           name: "SLA",
//           selector: (row) =>
//           row.sla <= 4 ? (
//             <Badge bg="success">{row.sla}</Badge>
//           ) : row.sla > 4 && row.sla < 14? (
//             <Badge bg="warning">{row.sla}</Badge>
//           ) :
//             <Badge bg="danger">{row.sla}</Badge>,
//           sortable: true,
//         },
//         {
//           name: "CENTRO",
//           selector: (row) => row.centro,
//           sortable: true,
//         },
//         {
//           name: "ESTADO",
//           selector: (row) =>
//             row.estado === "Pendiente" ? (
//               <Badge bg="danger">{row.estado}</Badge>
//             ) : row.estado === "Abierto" ? (
//               <Badge bg="primary">{row.estado}</Badge>
//             ) : row.estado === "Asignado" ? (
//               <Badge bg="warning">{row.estado}</Badge>
//             ) : (
//               <Badge bg="success">{row.estado}</Badge>
//             ),
//           sortable: true,
//         },
//         {
//           name: "LOCALIDAD",
//           selector: (row) => row.localidad,
//           sortable: true,
//         },
//         {
//           name: "ACCIONES",
//           // selector: (row) => row.localidad,
//           cell: (
//             row //
//           ) => (
//             <>
//               <Link to={`/avisos/details/${row.id}`}>
//                 <IconButton aria-label="delete" color="success">
//                   <SearchIcon />
//                 </IconButton>
//               </Link>
//               <Link to={`/edit/aviso/${row.id}`}>
//                 <IconButton aria-label="delete" color="secondary">
//                   <Create />
//                 </IconButton>
//               </Link>
//             </>
//           ),
//           ignoreRowClick: true,
//           allowOverflow: true,
//           button: true,
//         },
//         ]);

// 		return (
// 			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
// 		);
// 	}, [filterText, resetPaginationToggle]);

// 	return (
// 		<DataTable
// 			title="Contact List"
// 			columns={columns}
// 			data={filteredItems}
// 			pagination
// 			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
// 			subHeader
// 			subHeaderComponent={subHeaderComponentMemo}
// 			selectableRows
// 			persistTableHead
// 		/>
// 	);
// };

// export default Pruebas;