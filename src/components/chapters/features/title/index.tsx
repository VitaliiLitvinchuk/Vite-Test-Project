const Title = ({ title, className }: { title: string, className?: string }) => {
    return (
        <div className={className}>
            <hr />
            <h2>{title}</h2>
            <hr />
        </div>
    );
}

export default Title;