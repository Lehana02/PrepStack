export function calculateTaskStats(task){
    let totalHours=0;
    let completedHours=0;
    task.subTopics.forEach((t)=>{
        const subHours=t.durationDays*t.hoursPerDay
        totalHours+=subHours
        
        if(t.status==="done"){
            completedHours+=subHours
        }else if(t.status==="half") {
            completedHours+=subHours*0.5
        }
    })
    const remainingHours=totalHours-completedHours
    const now=Date.now()
    const deadline=new Date(task.deadline)

    const remainingDays=Math.max(1,Math.ceil((deadline-now)/(1000*60*60*24)))
    const dailyHoursNeeded=remainingDays>0?remainingHours/remainingDays:remainingHours

    const progressPercent=totalHours===0?0:(completedHours/totalHours)*100

    return {
        totalHours,
        completedHours,
        remainingHours,
        remainingDays,
        dailyHoursNeeded:Number(dailyHoursNeeded.toFixed(2)),
        progressPercent:Number(progressPercent.toFixed(2))
    }
}

export const updateTaskStatus = (task) => {
    const allDone = task.subTopics.every(sub => sub.status === "done");
    
    task.status = allDone ? "done" : "pending";
    return task.status
};