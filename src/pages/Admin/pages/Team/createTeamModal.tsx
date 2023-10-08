import { Button } from "../../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"


interface SettingsSideBarProps {
  setPage: (page: boolean) => void;
}
 
export default function ModalCreateTeam({setPage}: SettingsSideBarProps) {
  return (
    <div className='flex items-center justify-center w-full h-screen absolute'>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Criar Time</CardTitle>
          <CardDescription>Crie um time com um único clique.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Nome do seu time" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Tipo de time</Label>
                <Select>
                    <SelectTrigger id="framework">
                        <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="next">Divulgação</SelectItem>
                        <SelectItem value="sveltekit">Parcerias</SelectItem>
                        <SelectItem value="astro">Administrativo</SelectItem>
                        <SelectItem value="nuxt">Gestor</SelectItem>
                        <SelectItem value="nuxt">Outro</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setPage(false)}>Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  )
}