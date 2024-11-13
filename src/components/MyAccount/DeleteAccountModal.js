import React, { useState } from 'react'
import { deleteProfile } from '../../store/actions/login'
import showToast from '../../components/Common/Toast'
import { useDispatch } from 'react-redux'

function DeleteAccountModal() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const handleDelete = () => {
    setShow(false)
    dispatch(deleteProfile(showToast))
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-danger btn-m"
        data-toggle="modal"
        data-target="#deleteAccountModal"
        onClick={() => setShow(true)}
      >
        Delete Account
      </button>

      <div
        className={`modal fade ${show ? 'show' : ''}`}
        id="deleteAccountModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteAccountModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header ">
              <h3 className="modal-title" id="deleteAccountModalLabel">
                Confirm Delete Account
              </h3>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body ">
              <p className="fs-4 ">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={handleDelete}
              >
                Yes, Delete MY Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteAccountModal
