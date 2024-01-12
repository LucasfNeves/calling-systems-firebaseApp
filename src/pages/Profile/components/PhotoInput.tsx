import { UploadSimple } from 'phosphor-react'
import avatar from './../../../assets/avatar.svg'

interface PhotoInputProps {
  avatarUrl: string | null
  setAvatarUrl: (avatarUrl: string | null) => void
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function PhotoInput({ avatarUrl, handleFile }: PhotoInputProps) {
  return (
    <label
      className="group relative flex cursor-pointer items-center rounded-full border-2 border-violet-900"
      htmlFor="uploadPhoto"
    >
      <input
        type="file"
        accept="image/*"
        id="uploadPhoto"
        className="sr-only"
        onChange={handleFile}
      />
      <div className="transition-opacity duration-300 group-hover:opacity-50">
        {avatarUrl === null ? (
          <img
            width={250}
            height={250}
            src={avatar}
            alt="Avatar do usuário"
            className="easy-in-out h-32 w-32 rounded-full "
          />
        ) : (
          <img
            width={250}
            height={250}
            src={avatarUrl}
            alt="Avatar do usuário"
            className="h-32 w-32 rounded-full"
          />
        )}
      </div>
      <label
        className="absolute bottom-[50%] left-0 right-0 top-[50%]  flex cursor-pointer items-center justify-center "
        htmlFor="uploadPhoto"
      >
        <div className="z-50 rounded-full bg-violet-200 bg-opacity-10 p-1 transition duration-300 ease-in-out group-hover:bg-violet-900">
          <UploadSimple
            size={25}
            weight="fill"
            className="text-violet-900 opacity-50 transition duration-300 ease-in-out group-hover:text-violet-100 group-hover:opacity-100"
          />
        </div>
      </label>
    </label>
  )
}
