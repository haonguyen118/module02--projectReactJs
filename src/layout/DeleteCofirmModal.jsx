import { Button, Modal } from "antd";

export default function DeleteCofirmModal({
  isModalDeleteOpen,
  handleCancel,
  oldStatus,
  handleDelete,
}) {
  return (
    <div>
      <Modal
        title="Xác nhận!!!☠️"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalDeleteOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn {oldStatus === 1 ? "khoá" : "mở"} User?</p>
      </Modal>
    </div>
  );
}
