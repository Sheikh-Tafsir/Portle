import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdDeleteForever } from "react-icons/md";

export function DialogDemo({ title, description, buttonLabel, onSave }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {buttonLabel == "Delete" || "delete" ?
          <MdDeleteForever className='edit-button cursor-pointer ml-[0.5vw]'/>:null
        }
        {/* <Button variant="outline">{buttonLabel}</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-[5px]">{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {/* Add any additional inputs or form elements here */}
        <DialogFooter>
          <Button type="button" onClick={onSave}>{buttonLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
