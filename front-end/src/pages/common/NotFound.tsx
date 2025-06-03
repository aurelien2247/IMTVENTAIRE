interface NotFoundProps {
  message?: string;
}

export default function NotFound({ message = "Aucun élément trouvé" }: NotFoundProps) {
  return (
    <div className='container flex-1 flex items-center justify-center'>
        <h3 className='text-center'>{message}</h3>
    </div>
  )
}
