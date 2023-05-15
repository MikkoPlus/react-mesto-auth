import { useState } from "react";
import Input from "../SingleComponent/Input";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatarValue, setAvatarValue] = useState("");

  const handleSubmit = () => {
    onUpdateAvatar({
      avatar: avatarValue,
    });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      btnText="Обновить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      inputNames={["avatar"]}
      inputValues={[avatarValue]}
    >
      <Input
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        value={avatarValue || ""}
        onChange={(e) => setAvatarValue(e.target.value)}
        isPopupOpen={isOpen}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
