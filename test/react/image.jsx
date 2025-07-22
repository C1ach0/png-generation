<div className="h-screen bg-gradient-to-b from-green-200 via-blue-200 to-orange-200">
  <div className="h-screen flex flex-col items-center justify-center text-center">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
      Easily Create Beautiful Images Using{" "}
      {props.framework.map((fm, i) => (
        <span
          key={i}
          className={
            fm.type === "vue"
              ? "text-green-500"
              : fm.type === "html"
              ? "text-red-500"
              : fm.type === "react"
              ? "text-blue-500"
              : ""
          }
        >
          {fm.name}
          {i !== props.framework.length - 1 ? ", " : ""}
        </span>
      ))}
    </h1>
    <p className="text-lg text-gray-600 mb-8">
      Generate stunning images from your HTML templates in seconds
    </p>
  </div>
</div>
