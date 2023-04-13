import React from "react"
import PropTypes from "prop-types"

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handlesSort = (item) => {
        // console.log(item)
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" })
        } else {
            onSort({ path: item, order: "asc" })
        }
    }
    const markingSort = (item) => {
        if (selectedSort.path === undefined) {
            return ""
        } else if (selectedSort.path === item) {
            return (<i className={"bi bi-caret-" + (selectedSort.order === "asc" ? "up-fill" : "down-fill")}></i>)
        }
    }

    return (<thead>
        <tr>
            {Object.keys(columns).map((column) => (
                <th key={column}
                    onClick={columns[column].path ? () => handlesSort(columns[column].path) : undefined}
                    scope="col" {...{ role: columns[column].path && "button" }}>
                    {columns[column].name}
                    {markingSort(columns[column].path)}
                </th>
            ))}
        </tr>
    </thead>)
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
}

export default TableHeader
