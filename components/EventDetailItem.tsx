import Image from 'next/image';

export type EventDetailItemProps = {
    icon: string;
    alt: string;
    label: string;
}

const EventDetailItem = ({ icon , alt, label}: EventDetailItemProps) => {
  return (
    <div className='flex-row-gap-2 items-center'>
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
  )
}

export default EventDetailItem