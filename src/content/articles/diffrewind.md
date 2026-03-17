---
title: DiffRewind
date: 2024-09-20
description: Restoring GitLab Stacked Diffs.
---

## Before starting
If you’re reading this article, I assume you are already familiar with GitLab stacked diff, if you don't care about how GitLab handles stacked diffs internally, jump to "Lets dive in with DiffRewind". However, if you're not well-versed in this topic, I highly recommend checking out this excellent article by Gergely Orosz: [Stacked Diffs](https://newsletter.pragmaticengineer.com/p/stacked-diffs). It provides a comprehensive overview and is definitely worth your time. 

## The Challenge of Local Storage
While stacked diffs offer numerous benefits, they come with a unique challenge: they're stored locally in your repository. This means they aren't automatically shared when you clone a gitlab repo, making restoration and sharing across environments potentially tricky.

## Why Restoration Matters
Understanding how to restore stacked diffs is crucial for:

* **Recovering work after switching machines**
* **Collaborating on complex features**
* **Ensuring continuity in your development process**

In this guide, we'll dive into effective strategies for restoring GitLab stacked diffs, empowering you to manage your incremental changes with confidence.

## Where are Stacked Diffs Saved?
Stacked diffs are stored locally in your Git repository, specifically in the following directory:

```
{repository_dir}/.git/stacked/{stacked_diff_name}/
```

**Internal branch naming**
While to the developer, it would seem like we are working with one branch, GitLab internally creates a branch for each MR, with the following naming structure:
```
{author}-{stackedDiff_name}-{short-sha}
```
For example: `idan-feature-update-52d754b9`
this structure provides key information at a glance:

* **Who created the branch (`idan`)**
* **The name of the stacked diff (`feature-update`)**
* **A short SHA for unique identification (`52d754b9`)**

**Branch Storage Format**
Each branch in a stacked diff is saved as a JSON file within the stacked diff folder. The naming convention for these files is:

* **Filename: `{short_sha}.json`**
* **Example: For the branch `idan-feature-update-52d754b9`, the corresponding JSON file would be `52d754b9.json`**

## JSON Structure
Each JSON file contains essential information about the stacked diff branch.

```json
{
  "prev": "previous_stacked_diff_sha",
  "branch": "author-stackedDiff-name-short_sha",
  "sha": "current_stacked_diff_sha",
  "next": "next_stacked_diff_sha",
  "mr": "merge_request_url",
  "description": "merge_request_description"
}
```

**Stack Data Structure**
It's important to note that these branches are organized in a stack data structure. Each branch (represented by a JSON file) points to the previous and next branches in the stack, allowing for efficient traversal and management of the stacked diffs.
Understanding this storage mechanism and naming convention is key to effectively restoring and managing your stacked diffs in GitLab.

## Restoring Stacked Diffs
Restoring a stacked diff involves recreating the branch structure and updating Git's configuration. 

**1. Initiate Stacked Diff Restoration**
```bash
glab stack create
```
When prompted, enter the name of the stacked diff you want to restore.

**2. Understanding Git's Branch Configuration**
Git stores information about all branches (including remote and merge paths) in the `git-project/.git/config` file. Each branch entry in this file follows this format:
```
[branch "branch-name"]
remote = remote-name
merge = refs/heads/branch-name
```

For each branch in your stacked diff, you need to add an entry to the `git-project.git/config` file. Here's how to do it:
```
[branch "author-stackedDiff-name-short-sha"]
remote = {remote-name}
merge = refs/heads/author-stackedDiff-name-short-sha
```

**3. Specifying the Current Stack**
After adding all branch entries, you need to specify which stack you're currently working on. Add the following section to your `git-project.git/config` file:
```
[glab]
currentstack = your-stack-name
```

**4. Recreating Branch References**
For each branch in your stacked diff, you also need to create a file in the `git-project.git/refs/heads/` directory:

Navigate to the `git-project.git/refs/heads/` directory
Create a new file with the branch name, In this file, add the SHA of the branch.

## Lets dive in with DiffRewind
While the manual process described above gives you a deep understanding of how stacked diffs are restored, it can be time-consuming and prone to errors. This is the reason I have created [DiffRewind](github.com/IdanKoblik/DiffRewind). DiffRewind is a CLI tool that was specifically created to simplify the restoration of stacked diffs. It automates all the steps we've discussed, making the process of restoring your stacked diffs quick and error-free.

**Installation**
1) Clone the repository:
```git
git clone https://github.com/IdanKoblik/DiffRewind.git
cd DiffRewind
```
2) Install dependencies:
```
pip3 install -r requirements.txt
```

**Usage**
To restore a stacked diff, use the following command:
```bash
python3 main.py <path_to_repo>
```

Replace <path_to_repo> with the path to your GitLab project.

**example**
```
(.venv) [idan@idank DiffRewind]$ python3 main.py ~/testing/sheep-wars/

██████╗ ██╗███████╗███████╗██████╗ ███████╗██╗    ██╗██╗███╗   ██╗██████╗
██╔══██╗██║██╔════╝██╔════╝██╔══██╗██╔════╝██║    ██║██║████╗  ██║██╔══██╗
██║  ██║██║█████╗  █████╗  ██████╔╝█████╗  ██║ █╗ ██║██║██╔██╗ ██║██║  ██║
██║  ██║██║██╔══╝  ██╔══╝  ██╔══██╗██╔══╝  ██║███╗██║██║██║╚██╗██║██║  ██║
██████╔╝██║██║     ██║     ██║  ██║███████╗╚███╔███╔╝██║██║ ╚████║██████╔╝
╚═════╝ ╚═╝╚═╝     ╚═╝     ╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝╚═════╝

Stacked diffs:
[ 1 ] > origin/idan-changes (idan)
    - origin/idan-changes-eb64d1ac (MR IID: 31, Created at: 2024-08-25T11:48:54.159Z)
    - origin/idan-changes-970baf2b (MR IID: 32, Created at: 2024-08-25T12:08:49.314Z)
    - origin/idan-changes-52d754b9 (MR IID: 34, Created at: 2024-08-26T13:42:34.119Z)
    - origin/idan-changes-dbcf3953 (MR IID: 35, Created at: 2024-08-26T16:41:58.492Z)
Select which stacked diff to restore (1,2,3...) > 1
New stack created with title "changes".
```

## Resources
* [Gitlab Stacked diff](https://docs.gitlab.com/ee/user/project/merge_requests/stacked_diffs.html)
* [Gergely Orosz - Stacked diff](https://newsletter.pragmaticengineer.com/p/stacked-diffs)

Follow for more ⏬
[Github](https://github.com/IdanKoblik) / [LinkedIn](https://www.linkedin.com/in/idan-k/)