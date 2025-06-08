import { Button, Modal } from "antd";

export default function DeleteCofirmModal({
  isModalDeleteOpen,
  handleCancel,

  handleDelete,
}) {
  return (
    <div>
      <Modal
        title="Xác nhận xoá User!!!☠️"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalDeleteOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xoá User?</p>
      </Modal>
    </div>
  );
}
