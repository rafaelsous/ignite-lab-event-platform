import { CheckCircle, Lock } from 'phosphor-react';
import { format, isPast } from 'date-fns'
import { ptBR } from 'date-fns/locale';
import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames'

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
  const { slug: currentSlug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  });

  const isActiveLesson = currentSlug === slug;

  return (
    <div className={classnames(
        {
          'cursor-not-allowed': !isLessonAvailable,
        }
      )}
    >
      <Link to={`/event/lesson/${slug}`} className={classnames('group', {
        'pointer-events-none': !isLessonAvailable,
      })}>
        <span className="text-gray-300">
          {availableDateFormatted}
        </span>

        <div
          className={classnames(
            'p-4 mt-2 rounded border',
            {
              'border-gray-500': !isActiveLesson,
              'group-hover:border-green-500 transition-colors': isLessonAvailable && !isActiveLesson,
              'bg-green-500 border-green-500': isLessonAvailable && isActiveLesson
            }
          )}
        >
          <header className="flex items-center justify-between">
            {isLessonAvailable ? (
              <span className={classnames(
                'text-sm text-blue-500 font-medium flex items-center gap-2',
                {
                  'text-white': isActiveLesson
                }
              )}
            >
                <CheckCircle size={20} />
                Conteúdo liberado
              </span>
            ) : (
              <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                <Lock size={20} />
                Em breve
              </span>
            )}
            
            <span className={classnames(
                'text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold',
                {
                  'border-white': isActiveLesson
                }
              )}
            >
              {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
            </span>
          </header>

          <strong className={classnames(
              'mt-5 block',
              {
                'text-white': isActiveLesson,
                'text-gray-200': !isActiveLesson
              }
            )}
          >
            {title}
          </strong>
        </div>
      </Link>
    </div>
  )
}