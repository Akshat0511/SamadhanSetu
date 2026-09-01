const prisma = require("../config/db");

// ======================================================
// CREATE PROJECT
// ======================================================
const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      challengeId,
      universityId,
      industryId
    } = req.body;

    // --------------------------------------------
    // Validation
    // --------------------------------------------
    if (!name || !challengeId) {
      return res.status(400).json({
        success: false,
        message: "Project name and challengeId are required"
      });
    }

    // --------------------------------------------
    // Check challenge
    // --------------------------------------------
    const challenge = await prisma.challenge.findUnique({
      where: {
        id: challengeId
      }
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found"
      });
    }

    // --------------------------------------------
    // Check university
    // --------------------------------------------
    if (universityId) {
      const university = await prisma.university.findUnique({
        where: {
          id: universityId
        }
      });

      if (!university) {
        return res.status(404).json({
          success: false,
          message: "University not found"
        });
      }
    }

    // --------------------------------------------
    // Check industry partner
    // --------------------------------------------
    if (industryId) {
      const industry = await prisma.industryPartner.findUnique({
        where: {
          id: industryId
        }
      });

      if (!industry) {
        return res.status(404).json({
          success: false,
          message: "Industry partner not found"
        });
      }
    }

    // --------------------------------------------
    // Check duplicate project
    // --------------------------------------------
    const existingProject = await prisma.project.findUnique({
      where: {
        challengeId
      }
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: "Project already exists for this challenge",
        project: existingProject
      });
    }

    // --------------------------------------------
    // Create project
    // --------------------------------------------
    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        challengeId,
        universityId: universityId || null,
        industryId: industryId || null,
        progress: 0
      },

      include: {
        challenge: true,
        university: true,
        industry: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                district: true,
                organization: true
              }
            }
          }
        },
        milestones: true
      }
    });

    // --------------------------------------------
    // Update challenge status
    // --------------------------------------------
    await prisma.challenge.update({
      where: {
        id: challengeId
      },
      data: {
        status: "ASSIGNED"
      }
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project
    });

  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message
    });
  }
};


// ======================================================
// GET ALL PROJECTS
// ======================================================
const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        challenge: true,

        university: true,

        industry: true,

        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                district: true,
                organization: true
              }
            }
          }
        },

        milestones: true
      },

      orderBy: {
        createdAt: "desc"
      }
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });

  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get projects",
      error: error.message
    });
  }
};


// ======================================================
// GET PROJECT BY ID
// ======================================================
const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "projectId is required"
      });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      },

      include: {
        challenge: true,

        university: true,

        industry: true,

        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                district: true,
                organization: true
              }
            }
          }
        },

        milestones: {
          orderBy: {
            id: "asc"
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    return res.status(200).json({
      success: true,
      project
    });

  } catch (error) {
    console.error("GET PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get project",
      error: error.message
    });
  }
};


// ======================================================
// ADD PROJECT MEMBER
// ======================================================
const addProjectMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    // --------------------------------------------
    // Validation
    // --------------------------------------------
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "projectId is required"
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required"
      });
    }

    // --------------------------------------------
    // Check project
    // --------------------------------------------
    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // --------------------------------------------
    // Check user
    // --------------------------------------------
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // --------------------------------------------
    // Check duplicate member
    // --------------------------------------------
    const existingMember = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId
        }
      }
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "User is already a project member"
      });
    }

    // --------------------------------------------
    // Add member
    // --------------------------------------------
    const member = await prisma.projectMember.create({
      data: {
        projectId,
        userId
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            district: true,
            organization: true
          }
        },

        project: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return res.status(201).json({
      success: true,
      message: "Project member added successfully",
      member
    });

  } catch (error) {
    console.error("ADD PROJECT MEMBER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add project member",
      error: error.message
    });
  }
};


// ======================================================
// REMOVE PROJECT MEMBER
// ======================================================
const removeProjectMember = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    if (!projectId || !userId) {
      return res.status(400).json({
        success: false,
        message: "projectId and userId are required"
      });
    }

    const member = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId
        }
      }
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Project member not found"
      });
    }

    await prisma.projectMember.delete({
      where: {
        projectId_userId: {
          projectId,
          userId
        }
      }
    });

    return res.status(200).json({
      success: true,
      message: "Project member removed successfully"
    });

  } catch (error) {
    console.error("REMOVE PROJECT MEMBER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove project member",
      error: error.message
    });
  }
};


// ======================================================
// CREATE MILESTONE
// ======================================================
const createMilestone = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title } = req.body;

    // --------------------------------------------
    // Validation
    // --------------------------------------------
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "projectId is required"
      });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Milestone title is required"
      });
    }

    // --------------------------------------------
    // Check project
    // --------------------------------------------
    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // --------------------------------------------
    // Create milestone
    // --------------------------------------------
    const milestone = await prisma.milestone.create({
      data: {
        title: title.trim(),
        status: "PENDING",
        progress: 0,
        projectId
      }
    });

    return res.status(201).json({
      success: true,
      message: "Milestone created successfully",
      milestone
    });

  } catch (error) {
    console.error("CREATE MILESTONE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create milestone",
      error: error.message
    });
  }
};


// ======================================================
// GET PROJECT MILESTONES
// ======================================================
const getProjectMilestones = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "projectId is required"
      });
    }

    // --------------------------------------------
    // Check project
    // --------------------------------------------
    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // --------------------------------------------
    // Get milestones
    // --------------------------------------------
    const milestones = await prisma.milestone.findMany({
      where: {
        projectId
      },

      orderBy: {
        id: "asc"
      }
    });

    return res.status(200).json({
      success: true,
      count: milestones.length,
      milestones
    });

  } catch (error) {
    console.error("GET MILESTONES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get milestones",
      error: error.message
    });
  }
};


// ======================================================
// UPDATE MILESTONE
// ======================================================
const updateMilestone = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const {
      title,
      progress,
      status
    } = req.body;

    if (!milestoneId) {
      return res.status(400).json({
        success: false,
        message: "milestoneId is required"
      });
    }

    // --------------------------------------------
    // Find milestone
    // --------------------------------------------
    const existingMilestone = await prisma.milestone.findUnique({
      where: {
        id: milestoneId
      }
    });

    if (!existingMilestone) {
      return res.status(404).json({
        success: false,
        message: "Milestone not found"
      });
    }

    // --------------------------------------------
    // Prepare update data
    // --------------------------------------------
    const updateData = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Milestone title cannot be empty"
        });
      }

      updateData.title = title.trim();
    }

    // --------------------------------------------
    // Progress validation
    // --------------------------------------------
    if (progress !== undefined) {
      const numericProgress = Number(progress);

      if (
        !Number.isFinite(numericProgress) ||
        numericProgress < 0 ||
        numericProgress > 100
      ) {
        return res.status(400).json({
          success: false,
          message: "Progress must be a number between 0 and 100"
        });
      }

      updateData.progress = numericProgress;

      // Automatically calculate status
      if (numericProgress === 0) {
        updateData.status = "PENDING";
      } else if (numericProgress === 100) {
        updateData.status = "COMPLETED";
      } else {
        updateData.status = "IN_PROGRESS";
      }
    }

    // --------------------------------------------
    // Manual status
    // --------------------------------------------
    if (status !== undefined && progress === undefined) {
      const allowedStatuses = [
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED"
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid milestone status"
        });
      }

      updateData.status = status;
    }

    // --------------------------------------------
    // Update milestone
    // --------------------------------------------
    const milestone = await prisma.milestone.update({
      where: {
        id: milestoneId
      },

      data: updateData
    });

    // --------------------------------------------
    // Get all project milestones
    // --------------------------------------------
    const milestones = await prisma.milestone.findMany({
      where: {
        projectId: existingMilestone.projectId
      }
    });

    // --------------------------------------------
    // Calculate project progress
    // --------------------------------------------
    let projectProgress = 0;

    if (milestones.length > 0) {
      const totalProgress = milestones.reduce(
        (total, item) => total + item.progress,
        0
      );

      projectProgress = Math.round(
        totalProgress / milestones.length
      );
    }

    // --------------------------------------------
    // Update project progress
    // --------------------------------------------
    const project = await prisma.project.update({
      where: {
        id: existingMilestone.projectId
      },

      data: {
        progress: projectProgress
      }
    });

    // --------------------------------------------
    // Update challenge status
    // --------------------------------------------
    let challengeStatus = "ASSIGNED";

    if (projectProgress > 0 && projectProgress < 100) {
      challengeStatus = "IN_PROGRESS";
    }

    if (projectProgress === 100) {
      challengeStatus = "COMPLETED";
    }

    await prisma.challenge.update({
      where: {
        id: project.challengeId
      },

      data: {
        status: challengeStatus
      }
    });

    return res.status(200).json({
      success: true,
      message: "Milestone updated successfully",
      milestone,
      projectProgress,
      challengeStatus
    });

  } catch (error) {
    console.error("UPDATE MILESTONE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update milestone",
      error: error.message
    });
  }
};


// ======================================================
// UPDATE PROJECT PROGRESS DIRECTLY
// ======================================================
const updateProjectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { progress } = req.body;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "projectId is required"
      });
    }

    const numericProgress = Number(progress);

    if (
      progress === undefined ||
      !Number.isFinite(numericProgress) ||
      numericProgress < 0 ||
      numericProgress > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Progress must be a number between 0 and 100"
      });
    }

    // --------------------------------------------
    // Check project
    // --------------------------------------------
    const existingProject = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    // --------------------------------------------
    // Update project
    // --------------------------------------------
    const project = await prisma.project.update({
      where: {
        id: projectId
      },

      data: {
        progress: numericProgress
      }
    });

    // --------------------------------------------
    // Update challenge status
    // --------------------------------------------
    let challengeStatus = "ASSIGNED";

    if (
      numericProgress > 0 &&
      numericProgress < 100
    ) {
      challengeStatus = "IN_PROGRESS";
    }

    if (numericProgress === 100) {
      challengeStatus = "COMPLETED";
    }

    await prisma.challenge.update({
      where: {
        id: existingProject.challengeId
      },

      data: {
        status: challengeStatus
      }
    });

    return res.status(200).json({
      success: true,
      message: "Project progress updated successfully",
      project,
      challengeStatus
    });

  } catch (error) {
    console.error("UPDATE PROJECT PROGRESS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project progress",
      error: error.message
    });
  }
};


// ======================================================
// EXPORT
// ======================================================
module.exports = {
  createProject,
  getProjects,
  getProjectById,
  addProjectMember,
  removeProjectMember,
  createMilestone,
  getProjectMilestones,
  updateMilestone,
  updateProjectProgress
};