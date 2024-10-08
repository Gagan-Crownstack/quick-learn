import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { TeamEntity } from './team.entity';
import { CourseEntity } from './course.entity';

@Entity({ name: 'course_category' })
export class CourseCategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'int', nullable: false })
  team_id: number;

  @ManyToOne(() => TeamEntity, (team) => team.roadmap_categories)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @OneToMany(() => CourseEntity, (course) => course.course_category)
  courses: CourseEntity[];
}
