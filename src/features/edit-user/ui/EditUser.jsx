import { EditUserForm } from "./EditUserForm";
export const EditUser = ({ userData }) => {
  return (
    <div>
      <div>
        <div className="w-full h-auto flex gap-5 items-center mb-10">
          <img className="w-25 h-25 rounded-[50%] bg-gray-600" />
          <div className="lg:flex lg:gap-5">
            <div>
              <p>Имя</p>
              <p className="text-[18px]">{userData.fullName}</p>
            </div>
            <div>
              <p>Никнейм</p>
              <p className="text-[18px]">{userData.username}</p>
            </div>
            <div>
              <p>Отдел</p>
              <p className="text-[18px]">{userData.departmentName}</p>
            </div>
          </div>
        </div>
      </div>
      <EditUserForm userId={userData.userId} isFreeze={userData.isFreeze}/>
    </div>
  );
};
