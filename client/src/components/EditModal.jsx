import EditLogForm from "./EditLogForm";

function EditModal() {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <h3>Edit Log</h3>
        <EditLogForm />
      </div>
    </div>
  );
}

export default EditModal;
