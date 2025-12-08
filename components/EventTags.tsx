'use client';
const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className='flex flex-row gap-1.5 flex-wrap'>
        {tags.length > 0 && tags.map((tag) => (
            <span key={tag} className='pill'>{tag}</span>
        ))}
    </div>
  )
}

export default EventTags