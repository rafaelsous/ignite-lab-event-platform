import { DefaultUi, Player, Youtube } from "@vime/react"
import { CaretRight, DiscordLogo, FileArrowDown, ImageSquare, Lightning } from "phosphor-react"
import { gql, useQuery } from "@apollo/client";

import '@vime/core/themes/default.css'

const GET_LESSON_BY_SLUG = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: {slug: $slug}) {
      title
      videoId
      description
      teacher {
        avatarURL
        bio
        name
      }
    }
  }
`

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      avatarUrl: string;
      bio: string;
      name: string;
    }
  }
}

interface VideoProps {
  lessonSlug: string;
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG, {
    variables: {
      slug: lessonSlug
    }
  })

  if (!data) {
    return (
      <div className="flex-1 items-center justify-center">
        <p className="text-blue-500 text-xl font-medium">
          Carregando...
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube key={data.lesson.videoId} videoId={data?.lesson.videoId!} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl text-bold">
              {data?.lesson.title}
            </h1>

            <p className="mt-4 text-gray-200 leading-relaxed">
              {data?.lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                src={data.lesson.teacher.avatarUrl}
                alt="Rafael Sousa"
                className="border-2 border-blue-500 rounded-full w-16 h-16"
              />
              
              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  {data?.lesson.teacher.name}
                </strong>
                
                <span className="text-sm text-gray-200 block">
                  {data?.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a href="#" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
              <DiscordLogo size={24} />
              Comunidade no Discord
            </a>

            <a href="#" className="p-4 text-sm text-blue-500 flex items-center rounded border border-blue-500 font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>
        
        <div className="gap-8 grid grid-cols-2 mt-20">
          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 flex items-center h-full p-6">
              <FileArrowDown size={40}/>
            </div>

            <div className="flex flex-col justify-center py-6 leading-relaxed">
              <strong className="text-2xl font-bold">
                Material complementar
              </strong>

              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>

            <div className="flex items-center h-full p-6 text-blue-500">
              <CaretRight size={24} />
            </div>
          </a>
          
          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 flex items-center h-full p-6">
              <ImageSquare size={40}/>
            </div>

            <div className="flex flex-col justify-center py-6 leading-relaxed">
              <strong className="text-2xl font-bold">
                Wallpapers exclusivos
              </strong>

              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>

            <div className="flex items-center h-full p-6 text-blue-500">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}