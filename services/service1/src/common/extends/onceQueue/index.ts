// eslint-disable-next-line
import PQueue from 'p-queue';

type Task<TaskResultType> =
  | (() => PromiseLike<TaskResultType>)
  | (() => TaskResultType);

export class OnceQueue {
  private readonly tasks = new Map();

  private readonly queue = new PQueue({
    concurrency: 1,
  });

  /**
   * Добавляет в очередь задачу с проверкой уникальности
   * ! Если такая задача есть, возвращает промис на нее
   */
  public async add<TaskResultType>(
    func: Task<TaskResultType>,
    key: string,
  ): Promise<TaskResultType> {
    // если в ожидании уже есть такая задача
    const taskExists = this.tasks.get(key);

    if (taskExists) return taskExists;

    // флаг нужен для проверки моментального запуска
    // такой запуск не нужно вносить в мапу ожидающих
    let taskLaunchPostoned = true;

    const taskNew = this.queue.add(() => {
      taskLaunchPostoned = false;

      this.tasks.delete(key);

      return func();
    });

    if (taskLaunchPostoned) {
      this.tasks.set(key, taskNew);
    }

    return taskNew;
  }
}
