import React, { useState, useEffect } from "react"
import { paginate } from "../utils/paginate"
import Pagination from "./pagination"
import User from "./user"
import API from "../../api"
import PropTypes from "prop-types"
import GroupList from "./groupList"
import SearchStatus from "./searchStatus"

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectеdProf, setSelectеdProf] = useState()
    const pageSize = 4

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectеdProf])

    const handleProfessionsSelect = item => {
        setSelectеdProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const filteredUsers = selectеdProf
        ? allUsers.filter((user) => user.profession._id === selectеdProf._id)
        : allUsers

    const count = filteredUsers.length
    const userCrop = paginate(filteredUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectеdProf()
    }

    return (
        <div className="d-flex">

            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList selectedItem={selectеdProf} items={professions}
                        onItemSelect={handleProfessionsSelect} />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>Oчистить</button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User key={user._id} {...rest} {...user} />
                            ))}
                        </tbody>
                    </table>

                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>

    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired
}

export default Users
