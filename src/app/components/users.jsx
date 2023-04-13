import React, { useState, useEffect } from "react"
import { paginate } from "../utils/paginate"
import Pagination from "./pagination"
import API from "../../api"
import PropTypes from "prop-types"
import GroupList from "./groupList"
import SearchStatus from "./searchStatus"
import UserTable from "./usersTable"
import _ from "lodash"

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectеdProf, setSelectеdProf] = useState()
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })
    const pageSize = 5

    const [users, setUsers] = useState()

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data))
    }, [])

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark }
                }
                return user
            })
        )
    }

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

    const handleSort = (item) => {
        setSortBy(item)
    }

    if (users) {
        const filteredUsers = selectеdProf
            ? users.filter((user) => user.profession._id === selectеdProf._id)
            : users

        const count = filteredUsers.length
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const userCrop = paginate(sortedUsers, currentPage, pageSize)

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
                        <UserTable users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark} />
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
    return "Loading"
}

Users.propTypes = {
    users: PropTypes.array.isRequired
}

export default Users
